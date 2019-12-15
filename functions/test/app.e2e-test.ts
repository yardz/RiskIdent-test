import request from 'supertest';
import server from '../src/server';

describe('Transactions', () => {
	describe('GET /transactions', () => {
		it(`should has error if has no query params`, () => {
			return request(server)
				.get('/transactions')
				.expect(400);
		});
		it(`should be ok if has query params`, () => {
			return request(server)
				.get('/transactions')
				.query({ transactionId: '5c868b22eb7069b50c6d2d32', confidenceLevel: 0.5 })
				.expect(200);
		});
		it(`should be empty if query params has no match`, () => {
			return request(server)
				.get('/transactions')
				.query({ transactionId: 'XPTO', confidenceLevel: 1 })
				.expect(200)
				.expect('');
		});
		it(`should be error if confidence Level is higher than 1`, () => {
			return request(server)
				.get('/transactions')
				.query({ transactionId: '5c868b22eb7069b50c6d2d32', confidenceLevel: 2 })
				.expect(400);
		});
		it(`should be error if confidence Level is smaller than 0`, () => {
			return request(server)
				.get('/transactions')
				.query({ transactionId: '5c868b22eb7069b50c6d2d32', confidenceLevel: -1 })
				.expect(400);
		});
	});
});
