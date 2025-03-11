import { useForm } from 'react-hook-form';
import { UserService } from '@services';
import { loginFieldConfig, LoginFormData } from '@inputs';
import { useFormControllers } from '../hooks/form-controllers.hook.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@components';
import { setLoginMessage, setUser, useAppDispatch, useAppSelector } from '@redux';
import { useEffect } from 'react';
import { URL_API } from '@constans';
import axios from 'axios';

type FormData = {
	email: string;
	password: string;
};

export const Login = () => {
	const formMethods = useForm<LoginFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, loginFieldConfig);
	const message = useAppSelector((state) => state.message.loginMessage);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(setLoginMessage(null));
	}, []);

	const onSubmit = (data: FormData) => {
		UserService.loginUser(data.email.trim().toLowerCase(), data.password.trim()).then(
			(res) => {
				dispatch(setUser(res));
				res?.role === 'ADMIN' && navigate('/admin');
				res?.role === 'MANAGER' && navigate('/manager');
				res?.role === 'CUSTOMER' && navigate('/');
			},
		);
	};
	return (
		<>
			<div className={'flex flex-col w-full relative top-1/4 right-10'}>
				<h1 style={{ textAlign: 'center' }}>Вход</h1>
				<form
					onSubmit={formMethods.handleSubmit(onSubmit)}
					className={'flex flex-col items-center'}
				>
					{controllers.map(({ field, fieldState }, index) => (
						<label
							key={index}
							className={
								'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-1/3'
							}
						>
							{field.name === 'email' && 'Email:'}
							{field.name === 'password' && 'Пароль:'}
							<input
								{...field}
								placeholder={
									field.name === 'email'
										? 'Введите свой email'
										: 'Введите свой пароль'
								}
								type={
									field.name.includes('password') ? 'password' : 'text'
								}
								className={
									'w-full p-3 border-b-gray-800 border border-solid'
								}
							/>
							{fieldState.error && (
								<span style={{ color: 'red' }}>
									{fieldState.error.message}
								</span>
							)}
						</label>
					))}
					<Button
						type={'submit'}
						title={'Войти'}
						disabled={!formMethods.formState.isValid}
					/>

					{message && <span style={{ color: 'red' }}>{message}</span>}
				</form>
				<div className={'flex justify-around'}>
					<Button
						onClick={() => {
							axios.get(`${URL_API}/auth/yandex`);
						}}
						title={'YANDEX'}
					/>
					<Button
						onClick={() => {
							axios.get(`${URL_API}/auth/google`);
						}}
						title={'GOOGLE'}
					/>
				</div>

				<NavLink to={'/register'} className={'mx-auto mt-12'}>
					<Button title={'Регистрация'} />
				</NavLink>
			</div>
		</>
	);
};
