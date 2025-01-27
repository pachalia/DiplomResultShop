import { IUser } from './user.interface';
import { IToken } from './token.interface';

export interface ITokenModel extends IUser {
	accessToken: IToken;
	refreshToken: IToken;
}
