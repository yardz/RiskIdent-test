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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transaction_service_1 = require("./transaction.service");
const database_service_1 = require("../Database/database.service");
const transactions_args_1 = require("./transactions.args");
const transactions_response_1 = require("./transactions.response");
let TransactionController = class TransactionController {
    constructor(transactionService, databaseService) {
        this.transactionService = transactionService;
        this.databaseService = databaseService;
    }
    async getTransactionsByConfidenceLevel({ confidenceLevel, transactionId }) {
        return this.databaseService
            .get()
            .then(transactions => this.transactionService.filterTransactionById(transactions, transactionId))
            .then(transaction => transaction && this.transactionService.filterTransactionsChildrenByConfidenceLevel(transaction, confidenceLevel))
            .then(async (transaction) => {
            if (!!transaction && !!transaction.children) {
                transaction.children = this.transactionService.calculateCombinedConnectionInfo(transaction.children, {
                    confidence: 1,
                    type: [],
                });
            }
            return transaction;
        })
            .then(transaction => (transaction ? this.transactionService.transactionFlatten(transaction) : null));
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: 200, type: [transactions_response_1.ResponseGetTransactionsByConfidenceLevel] }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactions_args_1.GetTransactionsByConfidenceLevel]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionsByConfidenceLevel", null);
TransactionController = __decorate([
    swagger_1.ApiTags('Transactions'),
    common_1.Controller('transactions'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService, database_service_1.DatabaseService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map