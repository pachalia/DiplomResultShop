import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type AddProductToCartFormData = {
	quantity: number;
};

export const addProductToCartFieldConfig: FieldConfig<AddProductToCartFormData>[] = [
	{
		name: 'quantity',
		defaultValue: 1,
		rules: {
			required: 'Поле обязательно',
		},
	},
];
