import { GetTransactionsByConfidenceLevel, TypeNumber } from './transactions.args';
import { validate } from 'class-validator';

describe('Transactions params', () => {
	describe('GetTransactionsByConfidenceLevel', () => {
		describe('testing intervals for confidenceLevel', () => {
			it('should be true which decimal values', async () => {
				const query = new GetTransactionsByConfidenceLevel('XPTO', 0.5);
				const response = await validate(query);
				expect(response).toEqual([]);
			});
			it('should be true which limit values (0 to 1)', async () => {
				const min = await validate(new GetTransactionsByConfidenceLevel('XPTO', 0));
				const max = await validate(new GetTransactionsByConfidenceLevel('XPTO', 1));
				expect(min).toEqual([]);
				expect(max).toEqual([]);
			});
			it('should be false which values outside of limit (0 to 1)', async () => {
				const min = await validate(new GetTransactionsByConfidenceLevel('XPTO', -0.1));
				const max = await validate(new GetTransactionsByConfidenceLevel('XPTO', 1.1));
				expect(min.length).toBeGreaterThan(0);
				expect(max.length).toBeGreaterThan(0);
			});
			it('should be false which if interval is not a number', async () => {
				const test = await validate(new GetTransactionsByConfidenceLevel('XPTO', 'a' as any));
				expect(test.length).toBeGreaterThan(0);
			});
			it('TypeNumber', async () => {
				expect(TypeNumber()).toBe(Number);
			});
		});
	});
});
