import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type AddProductFormData = {
	name: string;
	description: string;
	price: number;
	quantity: number;
	image: File | null; // Измените на File | null
	category: string;
};

export const addProductFieldConfig: FieldConfig<AddProductFormData>[] = [
	{
		name: 'name',
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
		},
	},
	{
		name: 'description',
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
		},
	},
	{
		name: 'price',
		defaultValue: 0,
		rules: {
			required: 'Поле обязательно',
		},
	},
	{
		name: 'quantity',
		defaultValue: 0,
		rules: {
			required: 'Поле обязательно',
		},
	},
	{
		name: 'category',
		rules: {
			required: 'Поле обязательно',
		},
	},
	{
		name: 'image',
		defaultValue: null,
	},
];
