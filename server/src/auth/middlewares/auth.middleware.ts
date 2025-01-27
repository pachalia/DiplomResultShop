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
		const jwt = req.cookies.accesstoken;
		const _refreshtoken = req.cookies.refreshtoken;
		if (jwt) {
			req.headers.authorization = jwt;
		} else {
			const newToken = _refreshtoken
				? await this.authService.updateToken(_refreshtoken, res)
				: null;
			newToken ? (req.headers.authorization = newToken.accessToken.token) : null;
		}
		next();
	}
}
