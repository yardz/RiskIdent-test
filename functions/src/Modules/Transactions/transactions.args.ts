import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { IsBetween } from '../../Globals/ValidationsRules';

export const TypeNumber = () => Number;

export class GetTransactionsByConfidenceLevel {
	constructor(transactionId: string, confidenceLevel: number) {
		this.transactionId = transactionId;
		this.confidenceLevel = confidenceLevel;
	}

	@ApiProperty({
		type: String,
		example: '5c868b227167edc396fc3754',
	})
	@IsNotEmpty()
	@IsString()
	readonly transactionId: string;

	@ApiProperty({
		type: Number,
		minimum: 0,
		maximum: 1,
		example: 0.5,
		description: 'value between 0 and 1',
	})
	@IsNotEmpty()
	@Type(TypeNumber)
	@IsNumber()
	@IsBetween({ min: 0, max: 1 })
	readonly confidenceLevel: number;
}
