import React, { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import axios from 'axios';
import { URL_API_PRODUCTS } from '../../constans/url.constans.ts';
import { useAppDispatch } from '../../redux/hooks.ts';
import { addProduct } from '../../redux/features/slices/shopSlice.ts';
import { AddCategory } from '../addCategory/addCategory.tsx';

type FormData = {
	name: string;
	description: string;
	price: number;
	image: File | null; // Измените на File | null
	category: string;
};

interface IAddProductProps {
	categories: string[];
}

export const AddProduct: React.FC<IAddProductProps> = ({ categories }) => {
	const dispatch = useAppDispatch();
	const {
		handleSubmit,
		control,
		setValue,
		reset,
		formState: { isValid },
	} = useForm<FormData>({ mode: 'onChange' });

	const { field: nameField } = useController({
		name: 'name',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
		},
	});

	const { field: descriptionField } = useController({
		name: 'description',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
		},
	});

	const { field: priceField } = useController({
		name: 'price',
		control,
		defaultValue: 0,
		rules: {
			required: 'Поле обязательно',
		},
	});

	const { field: imageField } = useController({
		name: 'image',
		control,
		defaultValue: null, // Убедитесь, что здесь null
	});

	useEffect(() => {
		setValue('category', categories[0]);
	}, [categories, setValue]);

	const { field: categoryField } = useController({
		name: 'category',
		control,
		rules: {
			required: 'Поле обязательно',
		},
	});

	const onSubmit = (data: FormData) => {
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('description', data.description);
		formData.append('price', data.price.toString());
		formData.append('category', data.category);
		formData.append('image', data.image as Blob);
		axios.post(URL_API_PRODUCTS, formData).then((res) => {
			dispatch(addProduct(res.data));
			reset();
		});
	};

	return (
		<div className={'flex items-center flex-col justify-around'}>
			<AddCategory />
			<form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col'}>
				<input
					{...nameField}
					placeholder={'Наименование продукта'}
					className={'w-full p-3 border border-solid border-b-gray-800 mb-5'}
				/>
				<input
					{...descriptionField}
					placeholder={'Описание продукта'}
					className={'w-full p-3 border border-solid border-b-gray-800 mb-5'}
				/>
				<input
					{...priceField}
					type={'number'}
					placeholder={'Цена'}
					className={'w-full p-3 border border-solid border-b-gray-800 mb-5'}
				/>
				<select {...categoryField} className={'mb-5'}>
					{categories &&
						categories.map((val) => (
							<option key={val} value={val}>
								{val}
							</option>
						))}
				</select>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => {
						const files = e.target.files;
						// Устанавливаем только первый файл или null, если файлов нет
						imageField.onChange(files ? files[0] : null);
						console.log(imageField);
					}}
					className={'w-full p-3 border border-solid border-b-gray-800 mb-5'}
				/>
				<button
					type={'submit'}
					disabled={!isValid}
					className={isValid ? 'bg-blue-700 text-white' : undefined}
				>
					Отправить
				</button>
			</form>
		</div>
	);
};
