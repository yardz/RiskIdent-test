"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const number_precision_1 = __importDefault(require("number-precision"));
let TransactionService = class TransactionService {
    transformChildToParent(children) {
        const parent = Object.assign(Object.assign({}, lodash_1.omit(children, ['children', 'connectionInfo'])), { children: children.children ? children.children : [] });
        return parent;
    }
    async filterTransactionById(transactions, transactionId) {
        const match = transactions.filter(transaction => transaction.id === transactionId);
        if (match.length > 0) {
            return match[0];
        }
        const children = transactions
            .map(transaction => transaction.children)
            .map(childrenList => childrenList.map(child => this.transformChildToParent(child)))
            .filter(childrenList => childrenList.length > 0);
        if (children.length === 0) {
            return null;
        }
        const search = children.map(childrenList => this.filterTransactionById(childrenList, transactionId));
        return (await Promise.all(search)).filter(child => !!child)[0] || null;
    }
    async filterTransactionsChildrenByConfidenceLevel(transaction, confidenceLevel) {
        if (transaction.children) {
            transaction.children = await Promise.all(transaction.children
                .filter(child => child.connectionInfo && child.connectionInfo.confidence >= confidenceLevel)
                .map(child => this.filterTransactionsChildrenByConfidenceLevel(child, confidenceLevel)));
        }
        return transaction;
    }
    calculateCombinedConnectionInfo(transactions, parentCombinedConnectionInfo) {
        return transactions
            .map(transaction => {
            const { connectionInfo } = transaction;
            let type;
            let confidence;
            if (!connectionInfo) {
                type = parentCombinedConnectionInfo.type;
                confidence = 0;
            }
            else {
                type = parentCombinedConnectionInfo.type
                    .concat([connectionInfo.type])
                    .filter((currentType, index, types) => types.indexOf(currentType) === index);
                confidence = number_precision_1.default.times(parentCombinedConnectionInfo.confidence, connectionInfo.confidence);
            }
            transaction.combinedConnectionInfo = {
                confidence,
                type,
            };
            return transaction;
        })
            .map(transaction => {
            if (!!transaction.children && !!transaction.combinedConnectionInfo) {
                transaction.children = this.calculateCombinedConnectionInfo(transaction.children, transaction.combinedConnectionInfo);
            }
            return transaction;
        });
    }
    transactionFlatten(transaction) {
        const response = [];
        response.push(lodash_1.omit(transaction, ['children']));
        const { children } = transaction;
        if (children) {
            return response.concat(lodash_1.flatten(children.map(child => this.transactionFlatten(child))));
        }
        return response;
    }
};
TransactionService = __decorate([
    common_1.Injectable()
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map