import { Transaction } from './database.type';
export declare class DatabaseService {
    private getFromFile;
    get(): Promise<Transaction[]>;
}
