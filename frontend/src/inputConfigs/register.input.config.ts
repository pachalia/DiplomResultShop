import { FieldConfig } from '../hooks/form-controllers.hook.ts';
import { UseFormReturn } from 'react-hook-form';

export type RegisterFormData = {
	email: string;
	password: string;
	password_repeat: string;
};

export const registerFieldConfig = (
	formMethods: UseFormReturn<RegisterFormData>,
): FieldConfig<RegisterFormData>[] => {
	return [
		{
			name: 'email',
			defaultValue: '',
			rules: {
				required: 'Поле обязательно',
				pattern: { value: /^\S+@\S+\.\S+$/, message: 'Введите корректный email' },
			},
		},
		{
			name: 'password',
			defaultValue: '',
			rules: {
				required: 'Поле обязательно',
				minLength: { value: 6, message: 'Минимальное количество 6 символов' },
			},
		},
		{
			name: 'password_repeat',
			defaultValue: '',
			rules: {
				required: 'Поле обязательно',
				validate: (value: string) =>
					value === formMethods.getValues('password') || 'Пароли не совпадают.',
			},
		},
	];
};
