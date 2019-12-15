import { ApiProperty } from '@nestjs/swagger';

class GeoInfo {
	@ApiProperty({
		type: Number,
		example: -66.117512,
	})
	latitude: number;

	@ApiProperty({
		type: Number,
		example: -50.147742,
	})
	longitude: number;
}

class ConnectionInfo {
	@ApiProperty({
		type: String,
		example: 'sameEmail',
	})
	type: string;

	@ApiProperty({
		type: Number,
		example: 1,
	})
	confidence: number;
}

class CombinedConnectionInfo {
	@ApiProperty({
		type: [String],
		example: ['sameEmail', 'sameGeoInfo'],
	})
	type: string[];

	@ApiProperty({
		type: Number,
		example: 1,
	})
	confidence: number;
}

export class ResponseGetTransactionsByConfidenceLevel {
	@ApiProperty({
		type: String,
		example: '5c868b227167edc396fc3754',
	})
	readonly id: string;

	@ApiProperty({
		type: Number,
		example: 27,
	})
	readonly age: number;

	@ApiProperty({
		type: String,
		example: 'Laverne Valdez',
	})
	readonly name: string;

	@ApiProperty({
		type: String,
		example: 'lavernevaldez@equicom.com',
	})
	readonly email: string;

	@ApiProperty({
		type: String,
		example: '(972) 587-2491',
	})
	readonly phone: string;

	@ApiProperty({
		type: GeoInfo,
	})
	readonly geoInfo: GeoInfo;

	@ApiProperty({
		required: false,
		type: ConnectionInfo,
	})
	readonly connectionInfo?: ConnectionInfo;

	@ApiProperty({
		required: false,
		type: CombinedConnectionInfo,
	})
	readonly combinedConnectionInfo?: CombinedConnectionInfo;
}
