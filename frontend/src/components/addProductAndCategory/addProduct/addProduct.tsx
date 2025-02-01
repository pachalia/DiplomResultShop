import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addProductFieldConfig, AddProductFormData } from '../../../inputConfigs';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';
import { ProductService } from '../../../services';
import { useAppSelector } from '../../../redux/hooks.ts';


export const AddProduct: React.FC = () => {
	const formMethods = useForm<AddProductFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, addProductFieldConfig);
	const { categories } = useAppSelector((state) => state.category);

	useEffect(() => {
		categories.length && formMethods.setValue('category', categories[0]);
	}, [categories, formMethods.setValue]);

	const onSubmit = (data: AddProductFormData) => {
		ProductService.addProduct(data);
		formMethods.reset();
	};

	return (
		<>
			{categories.length && (
				<form
					onSubmit={formMethods.handleSubmit(onSubmit)}
					className={'flex flex-col'}
				>
					{controllers.map(({ field, fieldState }, index) => (
						<label
							key={index}
							className={
								'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-full'
							}
						>
							{field.name === 'name' && 'Название продукта:'}
							{field.name === 'description' && 'Описание продукта:'}
							{field.name === 'price' && 'Цена товара:'}
							{field.name === 'quantity' && 'Количество:'}
							{field.name === 'image' && 'Изоюражение продукта:'}
							{field.name === 'category' && 'Категория продукта:'}
							{field.name === 'image' && (
								<input
									type="file"
									accept="image/*"
									onChange={(e) => {
										const files = e.target.files;
										// Устанавливаем только первый файл или null, если файлов нет
										field.onChange(files ? files[0] : null);
									}}
									onBlur={field.onBlur}
								/>
							)}

							{field.name !== 'category' ? (
								<input
									onChange={field.onChange}
									onBlur={field.onBlur}
									type={
										field.name.includes('price') ||
										field.name.includes('quantity')
											? 'number'
											: 'text'
									}
									value={field.value}
									placeholder={
										field.name === 'name'
											? 'Введите название продукта'
											: field.name === 'description'
												? 'Введите описание'
												: field.name === 'price'
													? 'Введите цену'
													: field.name === 'quantity'
														? 'Введите количество'
														: 'Изображение'
									}
									className={
										'w-full p-3 border-b-gray-800 border border-solid'
									}
								/>
							) : (
								<select
									value={field.value}
									onChange={(e) => field.onChange(e.target.value)}
									onBlur={field.onBlur}
								>
									{categories &&
										categories.map((val) => (
											<option key={val} value={val}>
												{val}
											</option>
										))}
								</select>
							)}
							{fieldState.error && (
								<span style={{ color: 'red' }}>
									{fieldState.error.message}
								</span>
							)}
						</label>
					))}
					<button
						type={'submit'}
						disabled={!formMethods.formState.isValid}
						className={
							formMethods.formState.isValid
								? 'bg-blue-700 text-white'
								: undefined
						}
					>
						Отправить
					</button>
				</form>
			)}
		</>
	);
};
