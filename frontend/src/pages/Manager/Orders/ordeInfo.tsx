import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Message, OrderService, PaymentInfoResponse, PaymentService } from '@services';
import { Button, Modal } from '@components';

export const OrderInfo = () => {
	const { id } = useParams<{ id: string }>();
	const [order, setOrder] = useState<PaymentInfoResponse>();
	const [modal, setModal] = useState<{
		paymentId: string;
		orderId: string;
		refund: string;
		isModal: boolean;
	} | null>(null);

	const clickHandler = (paymentId: string, refund: string) => {
		PaymentService.paymentRefund(paymentId, refund).then((res) => {
			if (res.status === 'succeeded' && modal?.orderId) {
				OrderService.deleteOrder(modal?.orderId).then(() => {
					const orderArr = order?.orderItem ?? [];
					const newOrderArr = orderArr.filter(
						(val) => val.orderId !== modal?.orderId,
					);
					order && setOrder({ ...order, orderItem: newOrderArr });
				});
				Message.success('Заказ возвращён');
			}
		});
	};

	useEffect(() => {
		id && OrderService.getPaymentInfo(id).then((res) => setOrder(res));
	}, [id]);

	return (
		<>
			{modal?.isModal && (
				<div>
					<Modal
						message={'Удалить продукт из заказа?'}
						callback={() => clickHandler(modal?.paymentId, modal?.refund)}
						setModal={setModal}
					/>
				</div>
			)}
			{order && (
				<div className="container mx-auto p-6">
					<h1 className="text-center text-3xl text-gray-800 font-bold mb-6">
						{`Пользователь: ${order.email}`}
					</h1>
					<div className="bg-white shadow-md rounded-lg p-5 mb-6 w-6/12 m-auto">
						<h2 className="text-xl font-semibold mb-4 text-center">
							Информация о доставке
						</h2>
						<div className="grid grid-cols-1 gap-4">
							<div className="flex justify-between">
								<span className="font-medium">Город:</span>
								<span>{order.address.city}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium">Регион:</span>
								<span>{order.address.state}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium">Улица:</span>
								<span>{order.address.street}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium">Телефон:</span>
								<span>{order.address.phone}</span>
							</div>
						</div>
					</div>
					<div className="bg-white shadow-md rounded-lg p-5 mb-6 w-6/12 m-auto">
						<h2 className="text-xl font-semibold mb-4 text-center">
							Информация о платеже
						</h2>
						<div className="grid grid-cols-1 gap-4">
							<div className="flex justify-between">
								<span className="font-medium">Статус:</span>
								<span>{order.payment.status}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium">Сумма:</span>
								<span>{order.payment.amount.value}</span>
							</div>
							{order?.payment.income_amount?.value && (
								<div className="flex justify-between">
									<span className="font-medium">
										{' '}
										Сумма поступившая:
									</span>
									<span>{order.payment.income_amount.value}</span>
								</div>
							)}
							{order.payment?.payment_method?.card && (
								<div className="flex justify-between">
									<span className="font-medium">карта:</span>
									<span>
										{order.payment.payment_method.card.first6}
									</span>
								</div>
							)}
						</div>
					</div>
					<div className="bg-white shadow-md rounded-lg p-5 w-6/12 m-auto">
						<h2 className="text-xl font-semibold mb-4 text-center">
							Содержимое заказа
						</h2>
						<ul className="space-y-4">
							{order.orderItem.map((item, index) => (
								<li
									key={index}
									className="flex justify-between border-b pb-2"
								>
									<div>
										<h3 className="font-medium">
											{item.product.name}
										</h3>
										<p className="text-gray-600">{`Цена: ${item.product.price}р.`}</p>
										<p className="text-gray-600">{`Количество: ${item.product.quantity}`}</p>
										<p className="text-gray-600">{`В наличии: ${item.product.quantity_stock}`}</p>
									</div>
									<Button
										title={'Оформить возврат'}
										onClick={() => {
											const amount = (
												item.product.quantity * item.product.price
											).toString();
											setModal({
												isModal: true,
												refund: amount,
												paymentId: order.payment.id,
												orderId: item.orderId,
											});
										}}
									/>
									{/*{order.payment.status !== 'canceled' ? (*/}
									{/*	<Button*/}
									{/*		onClick={() => {*/}
									{/*			const amount = (*/}
									{/*				item.product.quantity **/}
									{/*				item.product.price*/}
									{/*			).toString();*/}
									{/*			setModal({*/}
									{/*				isModal: true,*/}
									{/*				refund: amount,*/}
									{/*				orderId: order.order,*/}
									{/*				orderItemId: item.id,*/}
									{/*			});*/}
									{/*		}}*/}
									{/*		title={'Оформить возврат'}*/}
									{/*	/>*/}
									{/*) : (*/}
									{/*	''*/}
									{/*)}*/}
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};
