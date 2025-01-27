import { Cookie, Public, UserAgent } from '@common/decorators';
import { HttpService } from '@nestjs/axios';
import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { GoogleGuard } from './guargs/google.guard';
import { YandexGuard } from './guargs/yandex.guard';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
	) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@Post('register')
	async register(
		@Body() dto: RegisterDto,
		@Res() res: Response,
		@UserAgent() agent: string,
	) {
		const user = await this.authService.register(dto);
		if (!user) {
			throw new BadRequestException(
				`Не получается зарегистрировать пользователя с данными ${JSON.stringify(dto)}`,
			);
		}
		await this.authService.registerCart(user.id);
		const tokens = await this.authService.generateTokens(user, agent);
		await this.authService.cookieAuthAndRefresh(tokens, res);
		res.json(tokens);
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res() res: Response, @UserAgent() agent: string) {
		const tokens = await this.authService.login(dto, agent, res);
		if (!tokens) {
			throw new BadRequestException(
				`Не получается войти с данными ${JSON.stringify(dto)}`,
			);
		}
		await this.authService.cookieAuthAndRefresh(tokens, res);
		res.json(tokens);
	}

	@Get('logout')
	async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
		if (!refreshToken) {
			res.sendStatus(HttpStatus.OK);
			return;
		}
		await this.authService.deleteRefreshToken(refreshToken);
		this.authService.logout(res);
	}

	@Get('refresh-tokens')
	async refreshTokens(
		@Cookie(REFRESH_TOKEN) refreshToken: string,
		@Res() res: Response,
		@UserAgent() agent: string,
	) {
		if (!refreshToken) {
			throw new UnauthorizedException();
		}
		const tokens = await this.authService.refreshTokens(refreshToken, agent);
		if (!tokens) {
			throw new UnauthorizedException();
		}
		res.json(tokens);
	}

	// private setRefreshTokenToCookies(tokens: ITokenModel, res: Response) {
	// 	if (!tokens) {
	// 		throw new UnauthorizedException();
	// 	}
	// 	res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
	// 		httpOnly: false,
	// 		sameSite: 'lax',
	// 		expires: new Date(tokens.refreshToken.exp),
	// 		secure: true,
	// 		// this.configService.get('NODE_ENV', 'development') === 'production',
	// 		path: '/',
	// 	});
	// 	res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
	// }

	@UseGuards(GoogleGuard)
	@Get('google')
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	googleAuth() {}

	@UseGuards(GoogleGuard)
	@Get('google/callback')
	googleAuthCallback(@Req() req: Request, @Res() res: Response) {
		const token = req.user['accessToken'];
		return res.redirect(
			`http://localhost:3010/api/auth/success-google?token=${token}`,
		);
	}

	// @Get('success-google')
	// // eslint-disable-next-line @typescript-eslint/no-empty-function
	// successGoogle(
	// 	@Query('token') token: string,
	// 	@UserAgent() agent: string,
	// 	@Res() res: Response,
	// ) {
	// 	return this.httpService
	// 		.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`)
	// 		.pipe(
	// 			mergeMap(({ data: { email } }) =>
	// 				this.authService.providerAuth(email, agent, Provider.GOOGLE),
	// 			),
	// 			map((data) => this.setRefreshTokenToCookies(data, res)),
	// 			handleTimeoutAndErrors(),
	// 		);
	// }

	@UseGuards(YandexGuard)
	@Get('yandex')
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	yandexAuth() {}

	@UseGuards(YandexGuard)
	@Get('yandex/callback')
	yandexAuthCallback(@Req() req: Request, @Res() res: Response) {
		const token = req.user['accessToken'];
		return res.redirect(
			`http://localhost:3010/api/auth/success-yandex?token=${token}`,
		);
	}

	// @Get('success-yandex')
	// // eslint-disable-next-line @typescript-eslint/no-empty-function
	// successYandex(
	// 	@Query('token') token: string,
	// 	@UserAgent() agent: string,
	// 	@Res() res: Response,
	// ) {
	// 	return this.httpService
	// 		.get(`https://login.yandex.ru/info?format=json&oauth_token=${token}`)
	// 		.pipe(
	// 			mergeMap(({ data: { default_email } }) =>
	// 				this.authService.providerAuth(default_email, agent, Provider.YANDEX),
	// 			),
	// 			map((data) => this.setRefreshTokenToCookies(data, res)),
	// 			handleTimeoutAndErrors(),
	// 		);
	// }
}
