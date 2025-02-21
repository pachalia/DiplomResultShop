import axios, { AxiosError } from 'axios';
import { URL_API } from '@constans';
import { setLoginMessage, setRegisterMessage, setUser, store } from '@redux';
import { IPagination, IUser } from '@interfaces';
import { PaginationResponse } from '../responses/pagination.response.ts';
import { Message } from './message.service.ts';
import { AddressFormData } from '../inputConfigs/address.input.config.ts';
import { IAddress } from '../interfaces/address.interface.ts';

export class UserService {
	static getCurrentUser() {
		axios
			.get<IUser>(`${URL_API}/auth/current-user`)
			.then((res) => store.dispatch(setUser(res.data)))
			.catch((e: AxiosError) => {
				console.log(e.message);
				return null;
			});
	}

	static loginUser(email: string, password: string) {
		return axios
			.post<IUser>(`${URL_API}/auth/login`, {
				email,
				password,
			})
			.then((res) => res.data)
			.catch((e: AxiosError) => {
				if (e.status === 401)
					store.dispatch(setLoginMessage('Неверный логин или пароль'));
				return null;
			});
	}

	static async registerUser(
		email: string,
		password: string,
		passwordRepeat: string,
	): Promise<IUser | null> {
		return await axios
			.post<IUser>(`${URL_API}/auth/register`, {
				email,
				password,
				passwordRepeat,
			})
			.then((res) => res.data)
			.catch((e: AxiosError) => {
				if (e.status === 409) {
					store.dispatch(
						setRegisterMessage('Такой пользователь уже зарегистрирован'),
					);
					return null;
				}
				return null;
			});
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
		return await axios
			.get(`${URL_API}/auth/logout`)
			.then(() => true)
			.catch((e: AxiosError) => {
				Message.danger(e.message);
				return false;
			});
	}

	static async getUsersRole(): Promise<string[]> {
		return await axios
			.get<string[]>(`${URL_API}/user/role`)
			.then((res) => res.data)
			.catch((e: AxiosError) => {
				Message.danger(e.message);
				return [];
			});
	}

	static async findUsersByEmail(email: string): Promise<IUser[] | null> {
		return await axios
			.get<IUser[]>(`${URL_API}/user/${email}`)
			.then((res) => res.data)
			.catch((e: AxiosError) => {
				Message.danger(e.message);
				return null;
			});
	}

	static async updateAddress(data: AddressFormData) {
		return await axios
			.put<IAddress>(`${URL_API}/address`, data)
			.then((res) => res.data)
			.catch((e: AxiosError) => {
				Message.danger(e.message);
				return null;
			});
	}
	static async getAddress() {
		return await axios
			.get<IAddress>(`${URL_API}/address`)
			.then((res) => res.data)
			.catch((e: AxiosError) => {
				Message.danger(e.message);
				return null;
			});
	}
}
