import { TransactionService } from './transaction.service';
import { DatabaseService } from '../Database/database.service';
import { GetTransactionsByConfidenceLevel } from './transactions.args';
import { ResponseGetTransactionsByConfidenceLevel } from './transactions.response';
export declare class TransactionController {
    private readonly transactionService;
    private readonly databaseService;
    constructor(transactionService: TransactionService, databaseService: DatabaseService);
    getTransactionsByConfidenceLevel({ confidenceLevel, transactionId }: GetTransactionsByConfidenceLevel): Promise<ResponseGetTransactionsByConfidenceLevel[] | null>;
}
