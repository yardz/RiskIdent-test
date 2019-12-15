import { Test } from '@nestjs/testing';

import { DatabaseService } from './database.service';

const inputJson = [{ name: 'data-mock-test-json' }];
jest.mock('./test-data.json', () => [{ name: 'data-mock-test-json' }]);

describe('Database', () => {
	let databaseService: DatabaseService;

	beforeEach(async done => {
		const module = await Test.createTestingModule({
			providers: [DatabaseService],
		}).compile();
		databaseService = module.get<DatabaseService>(DatabaseService);
		done();
	});

	describe('DatabaseService', () => {
		describe('get()', () => {
			it('get exactly the json file', async done => {
				expect(await databaseService.get()).toEqual(inputJson);
				done();
			});

			it('changes do not reflect in json data', async done => {
				const data = await databaseService.get();
				data[0].age = 100;
				expect(await databaseService.get()).toEqual(inputJson);
				done();
			});
		});
	});
});
