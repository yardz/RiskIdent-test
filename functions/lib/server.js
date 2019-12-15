"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const server = express_1.default();
core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server), { cors: true })
    .then(app => {
    app.use(helmet_1.default());
    app.use(body_parser_1.default.json());
    app.use(compression_1.default());
    app.use(new express_rate_limit_1.default({
        windowMs: 1 * 60 * 1000,
        max: 100,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.init()
        .then()
        .catch(error => console.log({ error }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('RiskIdent - Test')
        .setDescription('Documentation for RiskIdent API')
        .setVersion('1.0')
        .addServer('https://us-central1-riskident-test.cloudfunctions.net/api', 'Google Cloud API')
        .addServer('http://localhost:3000', 'Localhost API')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
})
    .catch(error => console.log({ error }));
exports.default = server;
//# sourceMappingURL=server.js.map