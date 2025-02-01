import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type LoginFormData = {
	email: string;
	password: string;
};

export const loginFieldConfig: FieldConfig<LoginFormData>[] = [
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
];
