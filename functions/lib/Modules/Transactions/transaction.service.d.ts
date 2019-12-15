import { Transaction, ChildrenTransaction } from '../Database/database.type';
export declare class TransactionService {
    private transformChildToParent;
    filterTransactionById(transactions: Transaction[], transactionId: string): Promise<Transaction | null>;
    filterTransactionsChildrenByConfidenceLevel<T extends Transaction | ChildrenTransaction>(transaction: T, confidenceLevel: number): Promise<T>;
    calculateCombinedConnectionInfo(transactions: ChildrenTransaction[], parentCombinedConnectionInfo: {
        type: string[];
        confidence: number;
    }): ChildrenTransaction[];
    transactionFlatten(transaction: Transaction | ChildrenTransaction): Array<Transaction | ChildrenTransaction>;
}
