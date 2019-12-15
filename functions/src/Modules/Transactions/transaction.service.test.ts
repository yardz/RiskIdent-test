import { Test } from '@nestjs/testing';

import { TransactionService } from './transaction.service';
import { omit } from 'lodash';

const transactionsDataTest = [
	{
		id: '5c868b22eb7069b50c6d2d32',
		children: [
			{
				id: '5c868b227167edc396fc3754',
				connectionInfo: {
					type: 'sameGeoInfo',
					confidence: 1,
				},
				children: [
					{
						id: '5c868b2213b36f773efcee81',
						connectionInfo: {
							type: 'sameEmail',
							confidence: 1,
						},
						children: [
							{
								id: '5c868b224aafffc5fcffd9c3',
								connectionInfo: {
									type: 'sameName',
									confidence: 0.8,
								},
								children: [
									{
										id: '5c868b22ad377c7f0df5d5e4',
										connectionInfo: {
											type: 'samePhoneNumber',
											confidence: 1,
										},
									},
									{
										id: '5c868b22674806abad3a8f9c',
										connectionInfo: {
											type: 'sameDeviceToken',
											confidence: 0.4,
										},
									},
								],
							},
						],
					},
				],
			},
			{
				id: '5c868b2283f8d69da7ad459d',
				connectionInfo: {
					type: 'sameDevice',
					confidence: 0.8,
				},
				children: [
					{
						id: '5c868b2283f8d69da7adsd459d',
						connectionInfo: {
							type: 'sameDevice',
							confidence: 0.5,
						},
						children: [],
					},
				],
			},
			{
				id: '5c868b2291d7da41e51f314a',
				connectionInfo: {
					type: 'sameName',
					confidence: 1,
				},
				children: [],
			},
		],
	},
	{
		id: '5c868b404c76ad62d445b91c',
		children: [],
	},
	{
		id: 'xxx',
		children: [
			{
				id: 'yyy',
				children: [],
			},
		],
	},
];

describe('Transactions', () => {
	let transactionService: TransactionService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [TransactionService],
		}).compile();
		transactionService = module.get<TransactionService>(TransactionService);
	});

	describe('TransactionService', () => {
		describe('filterTransactionById()', () => {
			it('match with root iten', async () => {
				expect(
					await transactionService.filterTransactionById(
						JSON.parse(JSON.stringify(transactionsDataTest)),
						transactionsDataTest[0].id,
					),
				).toEqual(transactionsDataTest[0]);
				expect(
					await transactionService.filterTransactionById(
						JSON.parse(JSON.stringify(transactionsDataTest)),
						transactionsDataTest[0].id,
					),
				).toEqual(transactionsDataTest[0]);
			});
			it('match with child level 2 iten', async () => {
				const match = transactionsDataTest[0].children[0];
				expect(await transactionService.filterTransactionById(JSON.parse(JSON.stringify(transactionsDataTest)), match.id)).toEqual({
					...omit(match, ['connectionInfo']),
				});
			});
			it('match with child level 3 iten', async () => {
				const match = transactionsDataTest[0].children[0].children[0].children[0];
				expect(await transactionService.filterTransactionById(JSON.parse(JSON.stringify(transactionsDataTest)), match.id)).toEqual({
					...omit(match, ['connectionInfo']),
				});
			});
			it('match with no itens', async () => {
				expect(await transactionService.filterTransactionById(JSON.parse(JSON.stringify(transactionsDataTest)), 'NO-ID')).toEqual(
					null,
				);
			});
		});

		describe('filterTransactionsChildrenByConfidenceLevel()', () => {
			it('get child only with confidenceLevel 0.8 or higher', async () => {
				const response: any = JSON.parse(JSON.stringify(transactionsDataTest[0]));
				response.children[0].children[0].children[0].children = [response.children[0].children[0].children[0].children[0]];
				response.children[1].children = [];
				expect(
					await transactionService.filterTransactionsChildrenByConfidenceLevel(
						JSON.parse(JSON.stringify(transactionsDataTest[0])),
						0.8,
					),
				).toEqual(response);
			});
			it('get child only with confidenceLevel 1', async () => {
				const response: any = JSON.parse(JSON.stringify(transactionsDataTest[0]));
				response.children[0].children[0].children = [];
				response.children = [response.children[0], response.children[2]];
				expect(
					await transactionService.filterTransactionsChildrenByConfidenceLevel(
						JSON.parse(JSON.stringify(transactionsDataTest[0])),
						1,
					),
				).toEqual(response);
			});
			it('get child only with confidenceLevel 0 or higher', async () => {
				const response: any = JSON.parse(JSON.stringify(transactionsDataTest[0]));
				expect(
					await transactionService.filterTransactionsChildrenByConfidenceLevel(
						JSON.parse(JSON.stringify(transactionsDataTest[0])),
						0,
					),
				).toEqual(response);
			});
		});

		describe('calculateCombinedConnectionInfo()', () => {
			it('calculate all tree', () => {
				const response = JSON.parse(
					'[{"id":"5c868b227167edc396fc3754","connectionInfo":{"type":"sameGeoInfo","confidence":1},"children":[{"id":"5c868b2213b36f773efcee81","connectionInfo":{"type":"sameEmail","confidence":1},"children":[{"id":"5c868b224aafffc5fcffd9c3","connectionInfo":{"type":"sameName","confidence":0.8},"children":[{"id":"5c868b22ad377c7f0df5d5e4","connectionInfo":{"type":"samePhoneNumber","confidence":1},"combinedConnectionInfo":{"confidence":0.8,"type":["sameGeoInfo","sameEmail","sameName","samePhoneNumber"]}},{"id":"5c868b22674806abad3a8f9c","connectionInfo":{"type":"sameDeviceToken","confidence":0.4},"combinedConnectionInfo":{"confidence":0.32,"type":["sameGeoInfo","sameEmail","sameName","sameDeviceToken"]}}],"combinedConnectionInfo":{"confidence":0.8,"type":["sameGeoInfo","sameEmail","sameName"]}}],"combinedConnectionInfo":{"confidence":1,"type":["sameGeoInfo","sameEmail"]}}],"combinedConnectionInfo":{"confidence":1,"type":["sameGeoInfo"]}},{"id":"5c868b2283f8d69da7ad459d","connectionInfo":{"type":"sameDevice","confidence":0.8},"children":[{"id":"5c868b2283f8d69da7adsd459d","connectionInfo":{"type":"sameDevice","confidence":0.5},"children":[],"combinedConnectionInfo":{"confidence":0.4,"type":["sameDevice"]}}],"combinedConnectionInfo":{"confidence":0.8,"type":["sameDevice"]}},{"id":"5c868b2291d7da41e51f314a","connectionInfo":{"type":"sameName","confidence":1},"children":[],"combinedConnectionInfo":{"confidence":1,"type":["sameName"]}}]',
				);
				expect(
					transactionService.calculateCombinedConnectionInfo(JSON.parse(JSON.stringify(transactionsDataTest[0].children)), {
						confidence: 1,
						type: [],
					}),
				).toEqual(response);
			});

			it('calculate if child has no connectionInfo', () => {
				const response = JSON.parse('[{"id":"yyy","children":[],"combinedConnectionInfo":{"confidence":0,"type":[]}}]');
				expect(
					transactionService.calculateCombinedConnectionInfo(JSON.parse(JSON.stringify(transactionsDataTest[2].children)), {
						confidence: 1,
						type: [],
					}),
				).toEqual(response);
			});
		});

		describe('transactionFlatten()', () => {
			it('calculate all tree', () => {
				const response = [
					omit(transactionsDataTest[0], ['children']),
					omit(transactionsDataTest[0].children[0], ['children']),
					omit(transactionsDataTest[0].children[0].children[0], ['children']),
					omit(transactionsDataTest[0].children[0].children[0].children[0], ['children']),
					omit(transactionsDataTest[0].children[0].children[0].children[0].children[0], ['children']),
					omit(transactionsDataTest[0].children[0].children[0].children[0].children[1], ['children']),
					omit(transactionsDataTest[0].children[1], ['children']),
					omit(transactionsDataTest[0].children[1].children[0], ['children']),
					omit(transactionsDataTest[0].children[2], ['children']),
				];
				expect(transactionService.transactionFlatten(JSON.parse(JSON.stringify(transactionsDataTest[0])))).toEqual(response);
			});
		});
	});
});
