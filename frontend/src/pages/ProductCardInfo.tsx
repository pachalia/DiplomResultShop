import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API_PRODUCTS } from '../constans/url.constans.ts';
// import { useController, useForm } from 'react-hook-form';
import { ProductByIdResponse } from '../responses/productByIdResponse.ts';
import { IProduct } from '../interfaces/product.interface.ts';

// type FormData = {
// 	quantity: number;
// };

export const ProductCardInfo = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<IProduct>();
	// const token = window.localStorage.getItem('token');

	// const {
	// 	handleSubmit,
	// 	control,
	// 	formState: { isValid },
	// } = useForm<FormData>({ mode: 'onChange' });
	//
	// const { field: quantity, fieldState: quantityState } = useController({
	// 	name: 'quantity',
	// 	control,
	// 	defaultValue: 1,
	// 	rules: {
	// 		min: 1,
	// 	},
	// });
	//
	// const onSubmit = (data: FormData) => {
	// 	if (token)
	// 		axios.post(
	// 			`${URL_API}/cart`,
	// 			{
	// 				productId: product?.id,
	// 				quantity: +data.quantity,
	// 			},
	// 			{ headers: { Authorization: token } },
	// 		);
	// };

	useEffect(() => {
		axios
			.get<ProductByIdResponse>(`${URL_API_PRODUCTS}/${id}`)
			.then((res) => setProduct(res.data));
	}, []);
	return (
		<div className={'w-full'}>
			<div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 w-6/12">
				{product?.image && (
					<img className="rounded-t-lg m-auto" src={product.image} alt="" />
				)}
				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
						{product && product.name}
					</h5>

					<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						{`Описание товара: ${product?.description}`}
					</h5>
					{/*<NavLink*/}
					{/*	to={`/product/${id}`}*/}
					{/*	className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
					{/*>*/}
					{/*	Узнать больше*/}
					{/*	<svg*/}
					{/*		className="rtl:rotate-180 w-3.5 h-3.5 ms-2"*/}
					{/*		aria-hidden="true"*/}
					{/*		xmlns="http://www.w3.org/2000/svg"*/}
					{/*		fill="none"*/}
					{/*		viewBox="0 0 14 10"*/}
					{/*	>*/}
					{/*		<path*/}
					{/*			stroke="currentColor"*/}
					{/*			strokeLinecap="round"*/}
					{/*			strokeLinejoin="round"*/}
					{/*			strokeWidth="2"*/}
					{/*			d="M1 5h12m0 0L9 1m4 4L9 9"*/}
					{/*		/>*/}
					{/*	</svg>*/}
					{/*</NavLink>*/}
				</div>
			</div>
			{/*{product && (*/}
			{/*	<div>*/}
			{/*		<div className={'text-center'}>{product.name}</div>*/}
			{/*		<div className={'w-3/12 m-auto'}>*/}
			{/*			<img*/}
			{/*				src="https://images.wallpaperscraft.com/image/single/lake_mountain_tree_36589_2650x1600.jpg"*/}
			{/*				alt=""*/}
			{/*			/>*/}
			{/*		</div>*/}
			{/*		<div>*/}
			{/*			<b>Описание товара: </b> {product.description}*/}
			{/*		</div>*/}
			{/*		<div>*/}
			{/*			<b>Стоимость:</b> {product.price}р.*/}
			{/*		</div>*/}
			{/*		<form onSubmit={handleSubmit(onSubmit)}>*/}
			{/*			<label*/}
			{/*				className={*/}
			{/*					'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-1/3'*/}
			{/*				}*/}
			{/*			>*/}
			{/*				Количество:{' '}*/}
			{/*				<input*/}
			{/*					{...quantity}*/}
			{/*					type={'number'}*/}
			{/*					placeholder={'Введите количество товара'}*/}
			{/*					className={*/}
			{/*						'w-full p-3 border border-solid border-b-gray-800'*/}
			{/*					}*/}
			{/*				/>*/}
			{/*				{quantityState.error && (*/}
			{/*					<span style={{ color: 'red' }}>*/}
			{/*						{quantityState.error.message}*/}
			{/*					</span>*/}
			{/*				)}*/}
			{/*			</label>*/}
			{/*			<button*/}
			{/*				type={'submit'}*/}
			{/*				disabled={!isValid}*/}
			{/*				className={isValid ? 'bg-blue-700 text-white' : undefined}*/}
			{/*			>*/}
			{/*				Добавить в корзину*/}
			{/*			</button>*/}
			{/*		</form>*/}
			{/*	</div>*/}
			{/*)}*/}
		</div>
	);
};
