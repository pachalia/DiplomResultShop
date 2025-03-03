import { Role, Token } from '@prisma/client';

export interface Tokens {
	accessToken: string;
	refreshToken: Token;
}

export interface JwtPayload {
	id: string;
	email: string;
	role: Role;
}
