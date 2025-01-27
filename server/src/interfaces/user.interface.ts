import { User } from '@prisma/client';

export interface IUser extends Pick<User, 'id' | 'email' | 'role'> {}
