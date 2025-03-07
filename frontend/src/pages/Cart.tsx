import { useAppSelector } from '@redux';
import { CartInfo } from '../components/cartInfo/cart.info.component.tsx';

export const Cart = () => {
	const { current_user } = useAppSelector((state) => state.user);

	return (
		<>
			<div className="max-w-3xl mx-auto p-4">
				<h1 className="text-center mb-8 text-4xl font-bold">Корзина</h1>
				{current_user ? <CartInfo /> : 'Вы не авторизованы'}
			</div>
		</>
	);
};
