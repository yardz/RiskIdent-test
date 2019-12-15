interface BaseTransaction {
	id: string;
	age: number;
	name: string;
	email: string;
	phone: string;
	geoInfo: {
		latitude: number;
		longitude: number;
	};
}

export interface ChildrenTransaction extends BaseTransaction {
	connectionInfo?: {
		type: string;
		confidence: number;
	};
	combinedConnectionInfo?: {
		type: string[];
		confidence: number;
	};
	children?: ChildrenTransaction[];
}

export interface Transaction extends BaseTransaction {
	children: ChildrenTransaction[];
}
