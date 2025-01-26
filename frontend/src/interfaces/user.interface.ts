import { Role } from '../../types/role.type.ts';

export interface IUser {
	id: string;
	email: string;
	role: Role;
}
