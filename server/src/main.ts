import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('PORT') || 3007;
	app.use(cookieParser());
	app.setGlobalPrefix('api');
	app.enableCors({ origin: true });
	app.useGlobalInterceptors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true, // Преобразование входящих данных в DTO
			whitelist: true, // Удаление лишних свойств
		}),
	);
	await app.listen(port, () => {
		Logger.log(`Приложение запущенно на порту ${port}`);
	});
}
bootstrap();
