import { useForm } from 'react-hook-form';
import { UserService } from '../services';
import { loginFieldConfig, LoginFormData } from '../inputConfigs';
import { useFormControllers } from '../hooks/form-controllers.hook.ts';
import { NavLink } from 'react-router-dom';
import { Button } from '../components';

type FormData = {
	email: string;
	password: string;
};

export const Login = () => {
	const formMethods = useForm<LoginFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, loginFieldConfig);

	const onSubmit = (data: FormData) => {
		UserService.loginUser(data.email, data.password);
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
					<button
						type={'submit'}
						disabled={!formMethods.formState.isValid}
						className={
							formMethods.formState.isValid
								? 'bg-blue-700 text-white mb-5'
								: 'mb-5'
						}
					>
						Войти
					</button>
				</form>
				<NavLink to={'/register'} className={'mx-auto'}>
					<Button title={'Регистрация'} />
				</NavLink>
			</div>
		</>
	);
};
