declare const _exports: ({
    "id": string;
    "age": number;
    "name": string;
    "email": string;
    "phone": string;
    "geoInfo": {
        "latitude": number;
        "longitude": number;
    };
    "children": {
        "id": string;
        "age": number;
        "name": string;
        "email": string;
        "phone": string;
        "connectionInfo": {
            "type": string;
            "confidence": number;
        };
        "geoInfo": {
            "latitude": number;
            "longitude": number;
        };
        "children": {
            "id": string;
            "age": number;
            "name": string;
            "email": string;
            "phone": string;
            "connectionInfo": {
                "type": string;
                "confidence": number;
            };
            "geoInfo": {
                "latitude": number;
                "longitude": number;
            };
            "children": {
                "id": string;
                "age": number;
                "name": string;
                "email": string;
                "phone": string;
                "connectionInfo": {
                    "type": string;
                    "confidence": number;
                };
                "geoInfo": {
                    "latitude": number;
                    "longitude": number;
                };
                "children": {
                    "id": string;
                    "age": number;
                    "name": string;
                    "email": string;
                    "phone": string;
                    "connectionInfo": {
                        "type": string;
                        "confidence": number;
                    };
                    "geoInfo": {
                        "latitude": number;
                        "longitude": number;
                    };
                }[];
            }[];
        }[];
    }[];
} | {
    "id": string;
    "age": number;
    "name": string;
    "email": string;
    "phone": string;
    "geoInfo": {
        "latitude": number;
        "longitude": number;
    };
    "children": {
        "id": string;
        "age": number;
        "name": string;
        "email": string;
        "phone": string;
        "geoInfo": {
            "latitude": number;
            "longitude": number;
        };
        "children": never[];
    }[];
})[];
export = _exports;
