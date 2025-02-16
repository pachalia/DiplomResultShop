import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type findUsersFormData = {
	email: string;
};

export const findUsersFieldConfig: FieldConfig<findUsersFormData>[] = [
	{
		name: 'email',
		defaultValue: '',
	},
];
