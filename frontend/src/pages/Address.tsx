import { useForm } from 'react-hook-form';
import { useFormControllers } from '../hooks/form-controllers.hook.ts';
import {
	AddressFieldConfig,
	AddressFormData,
} from '../inputConfigs/address.input.config.ts';
import { useEffect } from 'react';
import { UserService, Message } from '@services';
import { Button } from '@components';

export const Address = () => {
	const formMethods = useForm<AddressFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, AddressFieldConfig);
	useEffect(() => {
		UserService.getAddress()
			.then((res) => {
				formMethods.setValue('city', res?.city ?? '');
				formMethods.setValue('state', res?.state ?? '');
				formMethods.setValue('phone', res?.phone ?? '');
				formMethods.setValue('zipCode', res?.zipCode ?? '');
				formMethods.setValue('street', res?.street ?? '');
			})
			.catch((e: Error) => Message.danger(e.message));
	}, []);
	const onSubmit = (data: AddressFormData) => {
		UserService.updateAddress(data)
			.then(() => Message.success('Адрес обновлён'))
			.catch((e: Error) => Message.danger(e.message));
	};
	return (
		<>
			<form
				onSubmit={formMethods.handleSubmit(onSubmit)}
				className={'w-1/3 relative'}
				style={{ top: '15%' }}
			>
				{controllers.map(({ field, fieldState }, index) => (
					<label
						key={index}
						className={
							'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-full'
						}
					>
						{field.name === 'city' && 'Введите свой город:'}
						{field.name === 'state' && 'Введите свой регион:'}
						{field.name === 'zipCode' && 'Введите свой индекс:'}
						{field.name === 'phone' && 'Введите свой телефон:'}
						{field.name === 'street' && 'Введите свой адрес:'}
						<input
							{...field}
							placeholder={
								field.name === 'city'
									? 'Введите свой город'
									: field.name === 'phone'
										? 'Введите свой телефон'
										: field.name === 'state'
											? 'Введите свой регион'
											: field.name === 'street'
												? 'Введите свой адрес'
												: 'Введите почтовый индекс'
							}
							type={field.name.includes('password') ? 'password' : 'text'}
							className={'w-full p-3 border-b-gray-800 border border-solid'}
						/>
						{fieldState.error && (
							<span style={{ color: 'red' }}>
								{fieldState.error.message}
							</span>
						)}
					</label>
				))}
				<Button
					type={'submit'}
					title={'Отправить'}
					disabled={!formMethods.formState.isValid}
				/>
			</form>
		</>
	);
};
