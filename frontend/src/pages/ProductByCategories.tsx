import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductService } from '@services';
import { Order } from '@types';
import { Card } from '@components';
import { useAppSelector } from '@redux';

export const ProductByCategories = () => {
	const { id } = useParams();
	const { products } = useAppSelector((state) => state.product);
	const [order, setOrder] = useState<Order | null>(null);
	const [button, setButton] = useState<
		'По возрастанию' | 'По убыванию' | 'Без сортировки'
	>('По возрастанию');
	useEffect(() => {
		id && order
			? ProductService.getProducts({ order, category: id })
			: id && !order
				? ProductService.getProducts({ category: id })
				: null;

		if (order === 'asc') {
			setButton('По убыванию');
		}
		if (order === 'desc') {
			setButton('Без сортировки');
		}
		if (!order) {
			setButton('По возрастанию');
		}
	}, [order, id]);
	const clickHandler = () => {
		!order ? setOrder('asc') : null;
		order === 'asc' ? setOrder('desc') : null;
		order === 'desc' ? setOrder(null) : null;
	};
	return (
		<div className={'flex bg-amber-50 w-10/12'}>
			<div className={'w-1/12'}></div>
			<div className={'flex flex-col w-full items-center'}>
				{products.length ? <button onClick={clickHandler}>{button}</button> : ''}
				{products.length
					? products.map((val) => (
							<Card
								key={val.id}
								id={val.id}
								price={val.price}
								name={val.name}
								image={val.image}
							/>
						))
					: ''}
			</div>
		</div>
	);
};
