import { database as DB } from '../database/db.js';

export const getUserById = (id) => {
	const user = DB.users.find((user) => user.id === id);
	return user || null;
};
