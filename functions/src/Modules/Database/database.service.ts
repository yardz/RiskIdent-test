import { Injectable } from '@nestjs/common';

import testData from './test-data.json';

import { Transaction } from './database.type';

// Just an abstraction layer.
// If you need to change how to access transactions in the future, it will not impact the all of the system.
@Injectable()
export class DatabaseService {
	private getFromFile() {
		// A correct way to export in this case would be to use some immutable form, such as imutable.js
		// In this case for practicality, i chose to make this copy. So i guarantee that my data source will always be "new" in every request.
		return JSON.parse(JSON.stringify(testData));
	}

	async get(): Promise<Transaction[]> {
		return this.getFromFile();
	}
}
