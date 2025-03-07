import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type FindProductFormData = {
	product: string;
};

export const findProductFieldConfig: FieldConfig<FindProductFormData>[] = [
	{ name: 'product', defaultValue: '' },
];
