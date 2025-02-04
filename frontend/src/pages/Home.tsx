import { Card } from '../components';
import { useAppSelector } from '../redux/hooks.ts';
import { ProductService } from '../services';
import { useEffect, useState } from 'react';
import { Order } from '../../types/order.type.ts';

export const Home: React.FC = () => {
	const { products } = useAppSelector((state) => state.product);
	const [order, setOrder] = useState<Order | null>(null);
	const [button, setButton] = useState<
		'По возрастанию' | 'По убыванию' | 'Без сортировки'
	>('По возрастанию');
	useEffect(() => {
		order ? ProductService.getProducts({ order }) : ProductService.getProducts();
		if (order === 'asc') {
			setButton('По убыванию');
		}
		if (order === 'desc') {
			setButton('Без сортировки');
		}
		if (!order) {
			setButton('По возрастанию');
		}
	}, [order]);

	const clickHandler = () => {
		!order ? setOrder('asc') : null;
		order === 'asc' ? setOrder('desc') : null;
		order === 'desc' ? setOrder(null) : null;
	};
	return (
		<div className={'flex bg-amber-50 w-10/12'}>
			<div className={'w-1/12'}></div>
			<div className={'flex flex-col w-full items-center'}>
				<button onClick={clickHandler}>{button}</button>
				{products &&
					products.map((val) => (
						<Card
							key={val.id}
							id={val.id}
							price={val.price}
							name={val.name}
							image={val.image}
						/>
					))}
			</div>
		</div>
	);
};
