"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
class GeoInfo {
}
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        example: -66.117512,
    }),
    __metadata("design:type", Number)
], GeoInfo.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        example: -50.147742,
    }),
    __metadata("design:type", Number)
], GeoInfo.prototype, "longitude", void 0);
class ConnectionInfo {
}
__decorate([
    swagger_1.ApiProperty({
        type: String,
        example: 'sameEmail',
    }),
    __metadata("design:type", String)
], ConnectionInfo.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        example: 1,
    }),
    __metadata("design:type", Number)
], ConnectionInfo.prototype, "confidence", void 0);
class CombinedConnectionInfo {
}
__decorate([
    swagger_1.ApiProperty({
        type: [String],
        example: ['sameEmail', 'sameGeoInfo'],
    }),
    __metadata("design:type", Array)
], CombinedConnectionInfo.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        example: 1,
    }),
    __metadata("design:type", Number)
], CombinedConnectionInfo.prototype, "confidence", void 0);
class ResponseGetTransactionsByConfidenceLevel {
}
__decorate([
    swagger_1.ApiProperty({
        type: String,
        example: '5c868b227167edc396fc3754',
    }),
    __metadata("design:type", String)
], ResponseGetTransactionsByConfidenceLevel.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: Number,
        example: 27,
    }),
    __metadata("design:type", Number)
], ResponseGetTransactionsByConfidenceLevel.prototype, "age", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        example: 'Laverne Valdez',
    }),
    __metadata("design:type", String)
], ResponseGetTransactionsByConfidenceLevel.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        example: 'lavernevaldez@equicom.com',
    }),
    __metadata("design:type", String)
], ResponseGetTransactionsByConfidenceLevel.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: String,
        example: '(972) 587-2491',
    }),
    __metadata("design:type", String)
], ResponseGetTransactionsByConfidenceLevel.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: GeoInfo,
    }),
    __metadata("design:type", GeoInfo)
], ResponseGetTransactionsByConfidenceLevel.prototype, "geoInfo", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        type: ConnectionInfo,
    }),
    __metadata("design:type", ConnectionInfo)
], ResponseGetTransactionsByConfidenceLevel.prototype, "connectionInfo", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        type: CombinedConnectionInfo,
    }),
    __metadata("design:type", CombinedConnectionInfo)
], ResponseGetTransactionsByConfidenceLevel.prototype, "combinedConnectionInfo", void 0);
exports.ResponseGetTransactionsByConfidenceLevel = ResponseGetTransactionsByConfidenceLevel;
//# sourceMappingURL=transactions.response.js.map