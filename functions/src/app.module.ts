import { Module } from '@nestjs/common';
import { DatabaseModule, TransactionModule } from './Modules';

@Module({
	imports: [DatabaseModule, TransactionModule],
})
export class AppModule {}
