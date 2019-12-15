import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { DatabaseModule } from '../Database';

@Module({
	imports: [DatabaseModule],
	controllers: [TransactionController],
	providers: [TransactionService],
})
export class TransactionModule {}
