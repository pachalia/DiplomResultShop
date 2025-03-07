import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { addProductFieldConfig, AddProductFormData } from '@inputs';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';
import { ProductService, Message, CategoryService } from '@services';
import { useAppDispatch, useAppSelector, addProduct, setCategories } from '@redux';

export const AddProduct: React.FC = () => {
	const formMethods = useForm<AddProductFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, addProductFieldConfig);
	const { categories } = useAppSelector((state) => state.category);
	const dispatch = useAppDispatch();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		CategoryService.getCategory().then((res) => dispatch(setCategories(res.data)));
		categories?.data && formMethods.setValue('category', categories.data[0].name);
	}, []);

	const onSubmit = (data: AddProductFormData) => {
		ProductService.addProduct(data).then((res) => {
			Message.success('Продукт успешно добавлен');
			formMethods.reset();
			categories?.data && formMethods.setValue('category', categories.data[0].name);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
			res && dispatch(addProduct(res));
		});
	};

	return (
		<>
			{categories?.data.length ? (
				<div className={'w-full'}>
					<form
						onSubmit={formMethods.handleSubmit(onSubmit)}
						className={'flex flex-col'}
						style={{
							position: 'relative',
							top: '5%',
							left: '25%',
							width: '30%',
						}}
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
								{field.name === 'image' && 'Изображение продукта:'}
								{field.name === 'category' && 'Категория продукта:'}
								{field.name === 'image' && (
									<input
										ref={fileInputRef}
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
										value={
											typeof field.value === 'string' ||
											typeof field.value === 'number'
												? field.value
												: ''
										}
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
										value={
											typeof field.value === 'string' ||
											typeof field.value === 'number'
												? field.value
												: ''
										}
										onChange={(e) => field.onChange(e.target.value)}
										onBlur={field.onBlur}
									>
										{categories.data &&
											categories.data.map((val) => (
												<option key={val.name} value={val.name}>
													{val.name}
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
				</div>
			) : (
				<div></div>
			)}
		</>
	);
};
