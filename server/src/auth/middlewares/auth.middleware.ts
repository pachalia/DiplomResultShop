import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private authService: AuthService,
		private readonly moduleRef: ModuleRef,
	) {}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		req['__moduleRef__'] = this.moduleRef;
		const agent = req.headers['user-agent'];
		const jwt = req.cookies.accesstoken;
		const _refreshtoken: string = req.cookies.refreshtoken;
		if (jwt) {
			req.headers.authorization = jwt;
		} else {
			const newToken = _refreshtoken
				? await this.authService.refreshTokens(_refreshtoken, agent, res)
				: null;
			newToken ? (req.headers.authorization = newToken.accessToken.token) : null;
		}
		next();
	}
}
