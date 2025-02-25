import { Status } from '@interfaces';
import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type FindOrdersFormData = {
	status: Status;
	email: string;
};

export const FindOrdersFieldConfig: FieldConfig<FindOrdersFormData>[] = [
	{
		name: 'status',
		defaultValue: '',
	},
	{
		name: 'email',
		defaultValue: '',
	},
];
