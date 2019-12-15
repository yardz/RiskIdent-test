import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { TransactionService } from './transaction.service';
import { DatabaseService } from '../Database/database.service';

import { GetTransactionsByConfidenceLevel } from './transactions.args';
import { ResponseGetTransactionsByConfidenceLevel } from './transactions.response';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService, private readonly databaseService: DatabaseService) {}

	@Get()
	@ApiResponse({ status: 200, type: [ResponseGetTransactionsByConfidenceLevel] })
	async getTransactionsByConfidenceLevel(
		@Query() { confidenceLevel, transactionId }: GetTransactionsByConfidenceLevel,
	): Promise<ResponseGetTransactionsByConfidenceLevel[] | null> {
		return this.databaseService
			.get()
			.then(transactions => this.transactionService.filterTransactionById(transactions, transactionId))
			.then(
				transaction =>
					transaction && this.transactionService.filterTransactionsChildrenByConfidenceLevel(transaction, confidenceLevel),
			)
			.then(async transaction => {
				if (!!transaction && !!transaction.children) {
					transaction.children = this.transactionService.calculateCombinedConnectionInfo(transaction.children, {
						confidence: 1,
						type: [],
					});
				}
				return transaction;
			})
			.then(transaction => (transaction ? this.transactionService.transactionFlatten(transaction) : null));
	}
}
