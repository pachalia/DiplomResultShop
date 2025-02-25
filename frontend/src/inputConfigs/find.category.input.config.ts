import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type findCategoryFormData = {
	category: string;
};

export const findCategoryFieldConfig: FieldConfig<findCategoryFormData>[] = [
	{
		name: 'category',
		defaultValue: '',
	},
];
