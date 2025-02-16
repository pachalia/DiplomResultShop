import { useForm } from 'react-hook-form';
import { UserService } from '@services';
import { registerFieldConfig, RegisterFormData } from '@inputs';
import { useFormControllers } from '../hooks/form-controllers.hook.ts';
import { useAppDispatch, useAppSelector, setRegisterMessage, setUser } from '@redux';
import { Button } from '@components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
	const formMethods = useForm<RegisterFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, registerFieldConfig(formMethods));
	const message = useAppSelector((state) => state.message.registerMessage);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(setRegisterMessage(null));
	}, []);
	const onSubmit = (data: RegisterFormData) => {
		UserService.registerUser(
			data.email.trim().toLowerCase(),
			data.password.trim(),
			data.password_repeat.trim(),
		).then((res) => {
			dispatch(setUser(res));
			res?.role === 'ADMIN' && navigate('/admin');
			res?.role === 'MANAGER' && navigate('/manager');
			res?.role === 'CUSTOMER' && navigate('/');
		});
	};
	return (
		<div className={'flex flex-col w-full relative top-1/4 right-10'}>
			<h1 style={{ textAlign: 'center' }}>Регистрация пользователя</h1>
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
						{field.name === 'password_repeat' && 'Повторите пароль:'}
						<input
							{...field}
							placeholder={
								field.name === 'email'
									? 'Введите свой email'
									: field.name === 'password'
										? 'Введите свой пароль'
										: 'Повторите пароль'
							}
							type={field.name.includes('password') ? 'password' : 'text'}
							className={'w-full p-3 border-b-gray-800 border border-solid'}
						/>
						{fieldState.error && (
							<span style={{ color: 'red' }}>
								{fieldState.error.message}
							</span>
						)}
					</label>
				))}
				{formMethods.formState.isValid && (
					<Button type={'submit'} title={'Зарегестрироваться'} />
				)}

				{message && <span style={{ color: 'red' }}>{message}</span>}
			</form>
		</div>
	);
};
