import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID'), // получите это из Google Cloud Console
			clientSecret: configService.get('GOOGLE_CLIENT_SECRET'), // получите это из Google Cloud Console
			callbackURL: 'https://andreypachalia.ru/api/auth/google/callback', // измените это на свой callback URL
			scope: ['email', 'profile'],
			prompt: 'select_account',
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile,
		done: (err: unknown, user: unknown, info?: unknown) => void,
	): Promise<void> {
		const { name, emails, photos } = profile;
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			picture: photos[0].value,
			accessToken,
		};
		done(null, user);
	}
}
