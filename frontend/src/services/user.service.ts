import axios, { AxiosError } from 'axios';
import { URL_API } from '../constans/url.constans.ts';
import { store } from '../redux/store.ts';
import { setUser } from '../redux/features/slices/userSlice.ts';
import { IUser } from '../interfaces/user.interface.ts';
import { IPagination } from '../interfaces/pagination.interface.ts';
import { PaginationResponse } from '../responses/pagination.response.ts';

export class UserService {
	static async getCurrentUser() {
		const user = await axios
			.get<IUser>(`${URL_API}/auth/current-user`)
			.catch((e: AxiosError) => {
				console.log(e.message);
				return null;
			});
		store.dispatch(setUser(!user ? null : user.data));
	}

	static async loginUser(email: string, password: string) {
		const user = await axios
			.post<IUser>(`${URL_API}/auth/login`, {
				email,
				password,
			})
			.catch((e: AxiosError) => {
				console.log(e.message);
				return null;
			});
		store.dispatch(setUser(!user ? null : user.data));
	}

	static async registerUser(email: string, password: string, passwordRepeat: string) {
		const user = await axios
			.post<IUser>(`${URL_API}/auth/register`, {
				email,
				password,
				passwordRepeat,
			})
			.catch((e: AxiosError) => {
				if (e.status === 409) {
					console.log('Такой пользователь уже зарегестрирован');
					return null;
				}
				return null;
			});
		store.dispatch(setUser(!user ? null : user.data));
	}

	static async getUsers(
		pagination?: IPagination,
	): Promise<PaginationResponse<IUser[]> | undefined> {
		if (!pagination)
			return await axios
				.get<PaginationResponse<IUser[]>>(`${URL_API}/user`)
				.then((res) => res.data);
	}

	static async updateRoleUser(id: string, role: string) {
		return await axios.put<IUser>(`${URL_API}/user`, { id, role });
	}
	static async deleteUser(id: string) {
		return await axios
			.delete<{ id: string }>(`${URL_API}/user/${id}`)
			.then((res) => res.data);
	}

	static async logout() {
		await axios
			.get(`${URL_API}/auth/logout`)
			.then(() => store.dispatch(setUser(null)));
	}
}
