import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type AddCategoryFormData = {
	category: string;
};

export const AddCategoryFieldConfig: FieldConfig<AddCategoryFormData>[] = [
	{
		name: 'category',
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
		},
	},
];
