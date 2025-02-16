import { useAppDispatch, useAppSelector, setCart } from '@redux';
import axios from 'axios';
import { useEffect } from 'react';
import { URL_API } from '../constans/url.constans.ts';

import { CartService } from '@services';

export const Cart = () => {
	const dispatch = useAppDispatch();
	const token = window.localStorage.getItem('token');
	useEffect(() => {
		CartService.getCart();
	}, []);
	const { cart } = useAppSelector((state) => state.cart);

	const clickHandler = (id: string) => {
		token
			? axios
					.delete(`${URL_API}/cart/${id}`, {
						headers: { Authorization: token },
					})
					.then((res) => {
						if (res.data) {
							const newCart = cart.filter((val) => val.id !== id);
							dispatch(setCart(newCart));
						}
					})
			: null;
	};
	return (
		<div className={'w-full'}>
			<h1 className={'text-center mb-10 text-3xl'}>Корзина</h1>
			{cart.length
				? cart.map((val) => (
						<div
							key={val.id}
							className={
								'w-10/12 flex border border-solid border-gray-500 p-1 mb-2.5'
							}
						>
							<div className={'w-3/12'}>
								<img
									src="https://images.wallpaperscraft.com/image/single/lake_mountain_tree_36589_2650x1600.jpg"
									alt=""
								/>
							</div>
							<div className={'w-1/12'}></div>
							<div className={'flex w-full justify-between items-center'}>
								<div>
									<h1 className={'text-center'}>
										Наименование товара: {val.product_name}
									</h1>
									<div>Количество в заказе: {val.quantity}</div>
									<div>{`Стоимость ${val.product_price}р.`}</div>
									<div>
										Общая стоимость:{' '}
										{val.quantity * val.product_price}{' '}
									</div>
								</div>
							</div>
							<button onClick={() => clickHandler(val.id)}> Удалить</button>
						</div>
					))
				: ''}
			{cart.length
				? cart
						.map((val) => val.quantity * val.product_price)
						.reduce((acc, val) => (acc += val))
				: 'Корзина пуста'}
		</div>
	);
};
