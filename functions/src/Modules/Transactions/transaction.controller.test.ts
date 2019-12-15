import { Test } from '@nestjs/testing';

import { TransactionController } from './transaction.controller';

describe('Transactions', () => {
	let mockData: any;
	let mockService: any;
	let transactionController: TransactionController;

	beforeEach(async () => {
		mockService = {};
		mockData = {};

		const module = await Test.createTestingModule({
			controllers: [TransactionController],
			providers: [
				{
					provide: 'TransactionService',
					useValue: mockService,
				},
				{
					provide: 'DatabaseService',
					useValue: mockData,
				},
			],
		}).compile();
		transactionController = module.get<TransactionController>(TransactionController);
	});

	describe('TransactionController', () => {
		describe('getTransactionsByConfidenceLevel', () => {
			it('match transactions and has children', async () => {
				const confidenceLevel = 1;
				const transactionId = 'a';

				mockData.get = jest.fn().mockResolvedValueOnce({});
				mockService.filterTransactionById = jest.fn().mockResolvedValueOnce({ name: 'test' });
				mockService.filterTransactionsChildrenByConfidenceLevel = jest
					.fn()
					.mockResolvedValueOnce({ name: 'transaction', children: [{ name: 'child' }] });
				mockService.calculateCombinedConnectionInfo = jest.fn().mockReturnValueOnce([]);
				mockService.transactionFlatten = jest.fn().mockResolvedValueOnce('RESOLVED-VALUE-transactionFlatten');

				expect(await transactionController.getTransactionsByConfidenceLevel({ confidenceLevel, transactionId })).toEqual(
					'RESOLVED-VALUE-transactionFlatten',
				);

				expect(mockData.get).toHaveBeenCalledTimes(1);

				expect(mockService.filterTransactionById).toHaveBeenCalledTimes(1);
				expect(mockService.filterTransactionById).toHaveBeenCalledWith({}, transactionId);

				expect(mockService.filterTransactionsChildrenByConfidenceLevel).toHaveBeenCalledTimes(1);
				expect(mockService.filterTransactionsChildrenByConfidenceLevel).toHaveBeenCalledWith({ name: 'test' }, confidenceLevel);

				expect(mockService.calculateCombinedConnectionInfo).toHaveBeenCalledTimes(1);
				expect(mockService.calculateCombinedConnectionInfo).toHaveBeenCalledWith([{ name: 'child' }], {
					confidence: 1,
					type: [],
				});

				expect(mockService.transactionFlatten).toHaveBeenCalledTimes(1);
				expect(mockService.transactionFlatten).toHaveBeenCalledWith({ name: 'transaction', children: [] });
			});

			it('match transactions and has no children', async () => {
				const confidenceLevel = 1;
				const transactionId = 'a';

				mockData.get = jest.fn().mockResolvedValueOnce({});
				mockService.filterTransactionById = jest.fn().mockResolvedValueOnce({ name: 'test' });
				mockService.filterTransactionsChildrenByConfidenceLevel = jest.fn().mockResolvedValueOnce({ name: 'transaction' });
				mockService.calculateCombinedConnectionInfo = jest.fn().mockReturnValueOnce([]);
				mockService.transactionFlatten = jest.fn().mockResolvedValueOnce('RESOLVED-VALUE-transactionFlatten');

				expect(await transactionController.getTransactionsByConfidenceLevel({ confidenceLevel, transactionId })).toEqual(
					'RESOLVED-VALUE-transactionFlatten',
				);

				expect(mockData.get).toHaveBeenCalledTimes(1);

				expect(mockService.filterTransactionById).toHaveBeenCalledTimes(1);
				expect(mockService.filterTransactionById).toHaveBeenCalledWith({}, transactionId);

				expect(mockService.filterTransactionsChildrenByConfidenceLevel).toHaveBeenCalledTimes(1);
				expect(mockService.filterTransactionsChildrenByConfidenceLevel).toHaveBeenCalledWith({ name: 'test' }, confidenceLevel);

				expect(mockService.calculateCombinedConnectionInfo).toHaveBeenCalledTimes(0);

				expect(mockService.transactionFlatten).toHaveBeenCalledTimes(1);
				expect(mockService.transactionFlatten).toHaveBeenCalledWith({ name: 'transaction' });
			});

			it('match no transactions', async () => {
				const confidenceLevel = 1;
				const transactionId = 'a';

				mockData.get = jest.fn().mockResolvedValueOnce({});
				mockService.filterTransactionById = jest.fn().mockResolvedValueOnce(null);
				mockService.filterTransactionsChildrenByConfidenceLevel = jest.fn();
				mockService.calculateCombinedConnectionInfo = jest.fn();
				mockService.transactionFlatten = jest.fn();

				expect(await transactionController.getTransactionsByConfidenceLevel({ confidenceLevel, transactionId })).toEqual(null);

				expect(mockData.get).toHaveBeenCalledTimes(1);
				expect(mockService.filterTransactionById).toHaveBeenCalledTimes(1);
				expect(mockService.filterTransactionById).toHaveBeenCalledWith({}, transactionId);

				expect(mockService.filterTransactionsChildrenByConfidenceLevel).toHaveBeenCalledTimes(0);
				expect(mockService.calculateCombinedConnectionInfo).toHaveBeenCalledTimes(0);
				expect(mockService.transactionFlatten).toHaveBeenCalledTimes(0);
			});
		});
	});
});
