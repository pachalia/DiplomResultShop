import { deleteProductToCart, useAppDispatch, useAppSelector } from '@redux';
import { useEffect, useState } from 'react';
import YooWidget from 'react-yoomoneycheckoutwidget';
import { CartService, Message, OrderService } from '@services';
import { PaymentService } from '@services';

export const Cart = () => {
	const dispatch = useAppDispatch();
	const [token, setToken] = useState<string | undefined>();
	const [paymentId, setPaymentId] = useState<string | null>(null);

	useEffect(() => {
		CartService.getCart();
	}, []);
	const { cart } = useAppSelector((state) => state.cart);

	const clickHandler = (id: string) => {
		CartService.deleteProductToCart(id).then(() => dispatch(deleteProductToCart(id)));
	};

	const handlePayment = async () => {
		const totalAmount = cart.reduce(
			(acc, val) => acc + val.quantity * val.product_price,
			0,
		);
		const createPayment = async (value: string) => {
			const payment = await PaymentService.createPayment(value);
			setPaymentId(payment.id);
			setToken(payment.confirmation.confirmation_token);
		};
		createPayment(totalAmount.toString());
	};

	const onComplete = async () => {
		if (paymentId) {
			const order = await OrderService.createOrder(paymentId);
			cart.map(async (val) => {
				await OrderService.createOrderItem({
					orderId: order.id,
					productId: val.product_id,
					price: val.product_price.toString(),
					quantity: val.quantity.toString(),
				});
			});
			CartService.clearCart();
		}
		Message.success('Покупка осуществлена');
	};

	const onModalClose = () => {
		setToken(undefined);
		alert('Payment not finished');
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h1 className="text-center mb-8 text-4xl font-bold">Корзина</h1>
			{cart.length ? (
				cart.map((val) => (
					<div
						key={val.id}
						className="flex border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-white"
					>
						<div className="w-1/4">
							<img
								src={
									val.product_image
										? val.product_image
										: 'images/not_image.webp'
								}
								alt={val.product_name}
								className="rounded-lg"
							/>
						</div>
						<div className="flex-grow pl-4">
							<h2 className="text-lg font-semibold">{val.product_name}</h2>
							<p>Количество в заказе: {val.quantity}</p>
							<p>Стоимость: {val.product_price} р.</p>
							<p>Общая стоимость: {val.quantity * val.product_price} р.</p>
						</div>
						<button
							onClick={() => clickHandler(val.id)}
							className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							Удалить
						</button>
					</div>
				))
			) : (
				<p className="text-center text-gray-500">Корзина пуста</p>
			)}
			{cart.length > 0 && (
				<div className="text-right">
					<p className="text-lg font-bold text-center">
						Итого:{' '}
						{cart.reduce(
							(acc, val) => acc + val.quantity * val.product_price,
							0,
						)}{' '}
						р.
					</p>
					<button
						onClick={handlePayment}
						className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block m-auto"
					>
						Оплатить
					</button>
				</div>
			)}
			{token && (
				<YooWidget
					config={{
						confirmation_token: token,
						error_callback: (res) => console.log(res.error),
						customization: { modal: true },
					}}
					onComplete={onComplete}
					onModalClose={onModalClose}
				/>
			)}
		</div>
	);
};
