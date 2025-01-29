import { IUser } from './user.interface.ts';
import { IToken } from './token.interface.ts';

export interface ITokenModel extends IUser {
	accessToken: IToken;
	refreshToken: IToken;
}
