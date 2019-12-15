import { Injectable } from '@nestjs/common';

import { Transaction, ChildrenTransaction } from '../Database/database.type';

import { omit, flatten } from 'lodash';
import NP from 'number-precision';

@Injectable()
export class TransactionService {
	private transformChildToParent(children: ChildrenTransaction): Transaction {
		const parent: Transaction = {
			...omit(children, ['children', 'connectionInfo']),
			children: children.children ? children.children : [],
		};
		return parent;
	}

	async filterTransactionById(transactions: Transaction[], transactionId: string): Promise<Transaction | null> {
		const match = transactions.filter(transaction => transaction.id === transactionId);
		if (match.length > 0) {
			return match[0];
		}
		const children = transactions
			.map(transaction => transaction.children)
			.map(childrenList => childrenList.map(child => this.transformChildToParent(child)))
			.filter(childrenList => childrenList.length > 0);
		if (children.length === 0) {
			return null;
		}
		const search = children.map(childrenList => this.filterTransactionById(childrenList, transactionId));
		return (await Promise.all(search)).filter(child => !!child)[0] || null;
	}

	async filterTransactionsChildrenByConfidenceLevel<T extends Transaction | ChildrenTransaction>(
		transaction: T,
		confidenceLevel: number,
	): Promise<T> {
		if (transaction.children) {
			transaction.children = await Promise.all(
				transaction.children
					.filter(child => child.connectionInfo && child.connectionInfo.confidence >= confidenceLevel)
					.map(child => this.filterTransactionsChildrenByConfidenceLevel(child, confidenceLevel)),
			);
		}
		return transaction;
	}

	calculateCombinedConnectionInfo(
		transactions: ChildrenTransaction[],
		parentCombinedConnectionInfo: {
			type: string[];
			confidence: number;
		},
	): ChildrenTransaction[] {
		return transactions
			.map(transaction => {
				const { connectionInfo } = transaction;
				let type: string[];
				let confidence: number;
				if (!connectionInfo) {
					type = parentCombinedConnectionInfo.type;
					confidence = 0;
				} else {
					type = parentCombinedConnectionInfo.type
						.concat([connectionInfo.type])
						.filter((currentType, index, types) => types.indexOf(currentType) === index);
					confidence = NP.times(parentCombinedConnectionInfo.confidence, connectionInfo.confidence);
				}
				transaction.combinedConnectionInfo = {
					confidence,
					type,
				};
				return transaction;
			})
			.map(transaction => {
				if (!!transaction.children && !!transaction.combinedConnectionInfo) {
					transaction.children = this.calculateCombinedConnectionInfo(transaction.children, transaction.combinedConnectionInfo);
				}
				return transaction;
			});
	}

	transactionFlatten(transaction: Transaction | ChildrenTransaction): Array<Transaction | ChildrenTransaction> {
		const response: Array<Transaction | ChildrenTransaction> = [];

		response.push(omit(transaction, ['children']));

		const { children } = transaction;
		if (children) {
			return response.concat(flatten(children.map(child => this.transactionFlatten(child))));
		}
		return response;
	}
}
