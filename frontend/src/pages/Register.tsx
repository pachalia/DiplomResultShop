import { useController, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '../redux/hooks.ts';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import {setUser} from "../redux/features/slices/userSlice.ts";
import {URL_API} from "../constans/url.constans.ts";

type FormData = {
	email: string;
	password: string;
	password_repeat: string;
};

export const Register = () => {
	const [message, setMessage] = useState<string>('');
	const dispatch = useAppDispatch();
	const {
		handleSubmit,
		control,
		formState: { isValid },
	} = useForm<FormData>({ mode: 'onChange' });

	const { field: emailField, fieldState: emailFieldState } = useController({
		name: 'email',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
			pattern: { value: /^\S+@\S+\.\S+$/, message: 'Введите корректный email' },
		},
	});

	const { field: passwordField, fieldState: passwordFieldState } = useController({
		name: 'password',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
			minLength: { value: 6, message: 'Минимальное количество 8 символов' },
		},
	});

	const { field: passwordRepeatField, fieldState: passwordRepeatFieldState } =
		useController({
			name: 'password_repeat',
			control,
			defaultValue: '',
			rules: {
				required: 'Поле обязательно',
				validate: (value) =>
					value === passwordField.value || 'Пароли не совпадают.',
			},
		});

	const onSubmit = (data: FormData) => {
		axios
			.post(`${URL_API}/auth/register`, {
				email: data.email,
				password: data.password,
				passwordRepeat: data.password_repeat,
			})
			.then((res) => {
				dispatch(setUser(jwtDecode(res.data.accessToken)));
				window.localStorage.setItem('token', res.data.accessToken);
			})
			.catch((e: AxiosError) => {
				if (e.status === 409) {
					setMessage('Такой пользователь уже зарегестрирован');
				}
			});
	};
	return (
		<>
			<div className={'flex flex-col w-full relative top-1/4 right-10'}>
				<h1 style={{ textAlign: 'center' }}>Регистрация пользователя</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={'flex flex-col items-center'}
				>
					<label
						className={
							'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-1/3'
						}
					>
						Email:{' '}
						<input
							{...emailField}
							placeholder={'Введите свой email'}
							className={'w-full p-3 border border-solid border-b-gray-800'}
						/>
						{message && <span style={{ color: 'red' }}>{message}</span>}
						{emailFieldState.error && (
							<span style={{ color: 'red' }}>
								{emailFieldState.error.message}
							</span>
						)}
					</label>
					<label
						className={
							'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-1/3'
						}
					>
						Пароль:{' '}
						<input
							type={'password'}
							{...passwordField}
							placeholder={'Введите свой пароль'}
							className={'w-full p-3 border-b-gray-800 border border-solid'}
						/>
						{passwordFieldState.error && (
							<span style={{ color: 'red' }}>
								{passwordFieldState.error.message}
							</span>
						)}
					</label>

					<label
						className={
							'flex flex-col p-1 border border-solid border-gray-400 w-1/3'
						}
					>
						Повторите пароль:{' '}
						<input
							type={'password'}
							{...passwordRepeatField}
							placeholder={'Повторите пароль'}
							className={'w-full p-3 border-b-gray-800 border border-solid'}
						/>
						{passwordRepeatFieldState.error && (
							<span style={{ color: 'red' }}>
								{passwordRepeatFieldState.error.message}
							</span>
						)}
					</label>

					<button
						type={'submit'}
						disabled={!isValid}
						className={isValid ? 'bg-blue-700 text-white' : undefined}
					>
						Зарегестрироваться
					</button>
				</form>
			</div>
		</>
	);
};
