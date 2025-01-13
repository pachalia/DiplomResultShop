import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProduct } from '../redux/features/slices/shopSlice.ts';
import axios from 'axios';
import { URL_API, URL_API_PRODUCTS } from '../constans/url.constans.ts';
import { useController, useForm } from 'react-hook-form';

type FormData = {
	quantity: number;
};

export const Product = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<IProduct>();
	const token = window.localStorage.getItem('token');

	const {
		handleSubmit,
		control,
		formState: { isValid },
	} = useForm<FormData>({ mode: 'onChange' });

	const { field: quantity, fieldState: quantityState } = useController({
		name: 'quantity',
		control,
		defaultValue: 1,
		rules: {
			min: 1,
		},
	});

	const onSubmit = (data: FormData) => {
		if (token)
			axios.post(
				`${URL_API}/cart`,
				{
					productId: product?.id,
					quantity: +data.quantity,
				},
				{ headers: { Authorization: token } },
			);
	};

	useEffect(() => {
		axios.get(`${URL_API_PRODUCTS}/${id}`).then((res) => setProduct(res.data));
	}, []);
	return (
		<div>
			{product && (
				<div>
					<div className={'text-center'}>{product.name}</div>
					<div className={'w-3/12 m-auto'}>
						<img
							src="https://images.wallpaperscraft.com/image/single/lake_mountain_tree_36589_2650x1600.jpg"
							alt=""
						/>
					</div>
					<div>
						<b>Описание товара: </b> {product.description}
					</div>
					<div>
						<b>Стоимость:</b> {product.price}р.
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label
							className={
								'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-1/3'
							}
						>
							Количество:{' '}
							<input
								{...quantity}
								type={'number'}
								placeholder={'Введите количество товара'}
								className={
									'w-full p-3 border border-solid border-b-gray-800'
								}
							/>
							{quantityState.error && (
								<span style={{ color: 'red' }}>
									{quantityState.error.message}
								</span>
							)}
						</label>
						<button
							type={'submit'}
							disabled={!isValid}
							className={isValid ? 'bg-blue-700 text-white' : undefined}
						>
							Добавить в корзину
						</button>
					</form>
				</div>
			)}
		</div>
	);
};
