import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('YANDEX_APP_ID'), // Замените на свой APP_ID
			clientSecret: configService.get('YANDEX_APP_SECRET'), // Замените на свой APP_SECRET
			callbackURL: 'https://andreypachalia.ru/api/auth/yandex/callback', // Замените на свой callback URL
			scope: ['login:email'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile,
		done: (err: unknown, user: unknown, info?: unknown) => void,
	): Promise<void> {
		const { id, displayName, emails } = profile;
		// Здесь вы можете провести проверку пользователя и сохранить его данные в базе данных, если это необходимо.
		const user = {
			id,
			displayName,
			email: emails[0].value,
			accessToken,
		};
		done(null, user);
	}
}
