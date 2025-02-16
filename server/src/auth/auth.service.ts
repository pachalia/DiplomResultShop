import {
	ConflictException,
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Provider, Token, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { compareSync } from 'bcrypt';
import { v4 } from 'uuid';
import { LoginDto, RegisterDto } from './dto';
import { Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { ITokenModel } from '../interfaces/token-model.interface';
import { ConfigService } from '@nestjs/config';
import { convertToMillisecondsUtil } from '../utils/convert-to-millisecond';

export const REFRESH_TOKEN = 'refreshtoken';
export const ACCESS_TOKEN = 'accesstoken';
@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
	) {}

	// Регистрирует пользователя//
	async register(dto: RegisterDto): Promise<User> {
		const user: User = await this.userService.findOne(dto.email).catch((err) => {
			this.logger.error(err);
			return null;
		});
		if (user) {
			throw new ConflictException('Пользователь с таким email уже зарегистрирован');
		}
		return this.userService.save(dto).catch((err: Error) => {
			this.logger.error(err.message);
			return null;
		});
	}
	async refreshTokens(
		refreshToken: string,
		agent: string,
		res: Response,
	): Promise<ITokenModel> {
		const token =
			refreshToken &&
			(await this.prismaService.token.findFirst({
				where: { token: refreshToken },
			}));

		if (!token) {
			throw new UnauthorizedException();
		}
		const user = await this.userService
			.findOne(token.userId)
			.catch((e: Error) => this.logger.error(e.message));
		if (!user) return;

		if (new Date(token.exp) < new Date()) {
			await this.prismaService.token.delete({ where: { token: refreshToken } });
			const newToken = await this.generateTokens(user, agent);
			this.cookieAuthAndRefresh(newToken, res);
			return newToken;
		}
		const accessToken = await this.accessToken({
			id: user.id,
			email: user.email,
			role: user.role,
		});
		const expiration = Date.parse(token.exp.toString()) - Date.now();
		const newToken: ITokenModel = {
			id: user.id,
			email: user.email,
			role: user.role,
			accessToken,
			refreshToken: {
				token: token.token,
				exp: expiration,
			},
		};
		this.cookieAuthAndRefresh(newToken, res);
		return newToken;
	}

	async registerCart(userId: string) {
		return await this.prismaService.cart.create({ data: { userId } });
	}

	async registerAddress(userId: string) {
		return await this.prismaService.address.create({
			data: { userId, city: '', state: '', zipCode: '', phone: '', street: '' },
		});
	}

	async login(dto: LoginDto, agent: string, res: Response): Promise<ITokenModel> {
		const user: User = await this.userService
			.findOne(dto.email, true)
			.catch((err) => {
				this.logger.error(err);
				return null;
			});
		if (!user || !compareSync(dto.password, user.password)) {
			throw new UnauthorizedException('Не верный логин или пароль');
		}
		const token = await this.generateTokens(user, agent).catch((e: Error) =>
			this.logger.error(e.message),
		);
		token && this.cookieAuthAndRefresh(token, res);
		return token && token;
	}

	cookieAuthAndRefresh(token: ITokenModel, res: Response) {
		const accessTokenExp = convertToMillisecondsUtil(
			this.configService.get<string>('JWT_EXP'),
		);
		this.saveCookie(ACCESS_TOKEN, token.accessToken.token, accessTokenExp, res);
		this.saveCookie(
			REFRESH_TOKEN,
			token.refreshToken.token,
			token.refreshToken.exp,
			res,
		);
	}

	saveCookie(cookieName: string, val: string, exp: number, res: Response) {
		res.cookie(cookieName, val, {
			httpOnly: false,
			expires: new Date(Date.now() + exp),
		});
	}

	async accessToken(user: IUser) {
		return {
			token:
				'Bearer ' +
				this.jwtService.sign({
					id: user.id,
					email: user.email,
					role: user.role,
				}),
			exp: new Date(
				Date.now() + parseInt(this.configService.get<string>('JWT_EXP')),
			).valueOf(),
		};
	}

	async generateTokens(user: IUser, agent: string): Promise<ITokenModel> {
		const accessToken = await this.accessToken(user);
		const refreshToken = await this.getRefreshToken(user.id, agent);
		const { id, email, role } = user;
		return {
			id,
			email,
			role,
			accessToken,
			refreshToken: {
				token: refreshToken.token,
				exp: refreshToken.exp,
			},
		};
	}

	//Сохранение refreshToken в БД //
	private async getRefreshToken(userId: string, agent: string): Promise<Token> {
		const _token = await this.prismaService.token.findFirst({
			where: {
				userId,
				userAgent: agent,
			},
		});
		const token = _token?.token ?? '';
		return await this.prismaService.token.upsert({
			where: { token },
			update: {
				token: v4(),
				exp: convertToMillisecondsUtil('1M'),
			},
			create: {
				token: v4(),
				exp: convertToMillisecondsUtil('1M'),
				userId,
				userAgent: agent,
			},
		});
	}

	async deleteRefreshToken(token: string) {
		const _token = await this.prismaService.token.findFirst({ where: { token } });
		return _token && (await this.prismaService.token.delete({ where: { token } }));
	}

	async providerAuth(email: string, agent: string, provider: Provider) {
		const userExists = await this.userService.findOne(email);
		if (userExists) {
			const user = await this.userService.save({ email, provider }).catch((err) => {
				this.logger.error(err);
				return null;
			});
			return this.generateTokens(user, agent);
		}
		const user = await this.userService.save({ email, provider }).catch((err) => {
			this.logger.error(err);
			return null;
		});
		if (!user) {
			throw new HttpException(
				`Не получилось создать пользователя с email ${email} в Google auth`,
				HttpStatus.BAD_REQUEST,
			);
		}
		return this.generateTokens(user, agent);
	}

	logout(res: Response) {
		res.clearCookie(ACCESS_TOKEN);
		res.clearCookie(REFRESH_TOKEN);
		res.sendStatus(HttpStatus.OK);
	}
}
