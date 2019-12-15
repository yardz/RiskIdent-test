import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import express from 'express';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import compression from 'compression';

const server = express();

NestFactory.create(AppModule, new ExpressAdapter(server), { cors: true })
	.then(app => {
		app.use(helmet());
		app.use(bodyParser.json());
		app.use(compression());
		app.use(
			new rateLimit({
				windowMs: 1 * 60 * 1000,
				max: 100,
			}),
		);
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
			}),
		);
		app.init()
			.then()
			.catch(error => console.log({ error }));

		const options = new DocumentBuilder()
			.setTitle('RiskIdent - Test')
			.setDescription('Documentation for RiskIdent API')
			.setVersion('1.0')
			.addServer('https://us-central1-riskident-test.cloudfunctions.net/api', 'Google Cloud API')
			.addServer('http://localhost:3000', 'Localhost API')
			.build();
		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('swagger', app, document);
	})
	.catch(error => console.log({ error }));

export default server;
