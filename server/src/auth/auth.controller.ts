import { Cookie, CurrentUser, Public, UserAgent } from '@common/decorators';
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
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { GoogleGuard } from './guargs/google.guard';
import { YandexGuard } from './guargs/yandex.guard';
import { IUser } from '../interfaces/user.interface';
import { Provider } from '@prisma/client';

const REFRESH_TOKEN = 'refreshtoken';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	@Public()
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
		await this.authService.registerAddress(user.id);
		const tokens = await this.authService.generateTokens(user, agent);
		await this.authService.cookieAuthAndRefresh(tokens, res);
		res.json({ id: tokens.id, email: tokens.email, role: tokens.role });
	}

	@Public()
	@Post('login')
	async login(@Body() dto: LoginDto, @Res() res: Response, @UserAgent() agent: string) {
		const tokens = await this.authService.login(dto, agent, res);
		if (!tokens) {
			throw new BadRequestException(
				`Не получается войти с данными ${JSON.stringify(dto)}`,
			);
		}
		res.json({ id: tokens.id, email: tokens.email, role: tokens.role });
	}

	@Get('current-user')
	getCurrentUser(@CurrentUser() user: IUser, @Res() res: Response) {
		res.json({ id: user.id, email: user.email, role: user.role });
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

	@Public()
	@UseGuards(GoogleGuard)
	@Get('google')
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	googleAuth() {}

	@Public()
	@UseGuards(GoogleGuard)
	@Get('google/callback')
	async googleAuthCallback(
		@Req() req: Request,
		@Res() res: Response,
		@UserAgent() agent: string,
	) {
		await this.authService.providerAuth(
			req.user['email'],
			agent,
			Provider.GOOGLE,
			res,
		);
		return res.redirect('/');
	}

	@Public()
	@UseGuards(YandexGuard)
	@Get('yandex')
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	yandexAuth() {}

	@Public()
	@UseGuards(YandexGuard)
	@Get('yandex/callback')
	async yandexAuthCallback(
		@Req() req: Request,
		@Res() res: Response,
		@UserAgent() agent: string,
	) {
		await this.authService.providerAuth(
			req.user['email'],
			agent,
			Provider.YANDEX,
			res,
		);
		return res.redirect('/');
	}
}
