type Role = 'ADMIN' | 'CUSTOMER' | 'MANAGER';
export interface IUser {
	id: string;
	email: string;
	role: Role;
}
