import { FieldConfig } from '../hooks/form-controllers.hook.ts';

export type AddressFormData = {
	city: string;
	state: string;
	street: string;
	zipCode: string;
	phone: string;
};

export const AddressFieldConfig: FieldConfig<AddressFormData>[] = [
	{ name: 'city', rules: { required: 'Поле обязательно' } },
	{ name: 'state', rules: { required: 'Поле обязательно' } },
	{ name: 'street', rules: { required: 'Поле обязательно' } },
	{ name: 'zipCode', rules: { required: 'Поле обязательно' } },
	{ name: 'phone', rules: { required: 'Поле обязательно' } },
];
