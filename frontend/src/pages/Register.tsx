import { useForm } from 'react-hook-form';
import { UserService } from '../services/user.service.ts';
import {
	registerFieldConfig,
	RegisterFormData,
} from '../inputConfigs/register.input.config.ts';
import { useFormControllers } from '../hooks/form-controllers.hook.ts';

export const Register = () => {
	const formMethods = useForm<RegisterFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, registerFieldConfig(formMethods));
	const onSubmit = (data: RegisterFormData) => {
		UserService.registerUser(data.email, data.password, data.password_repeat);
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
				<button
					type={'submit'}
					disabled={!formMethods.formState.isValid}
					className={
						formMethods.formState.isValid
							? 'bg-blue-700 text-white'
							: undefined
					}
				>
					Зарегистрироваться
				</button>
				{/*{message && <span style={{ color: 'red' }}>{message}</span>}*/}
			</form>
		</div>
	);
};
