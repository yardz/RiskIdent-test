declare class GeoInfo {
    latitude: number;
    longitude: number;
}
declare class ConnectionInfo {
    type: string;
    confidence: number;
}
declare class CombinedConnectionInfo {
    type: string[];
    confidence: number;
}
export declare class ResponseGetTransactionsByConfidenceLevel {
    readonly id: string;
    readonly age: number;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly geoInfo: GeoInfo;
    readonly connectionInfo?: ConnectionInfo;
    readonly combinedConnectionInfo?: CombinedConnectionInfo;
}
export {};
