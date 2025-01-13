import { IProduct } from '../../redux/features/slices/shopSlice.ts';
import { NavLink, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks.ts';
import { useEffect, useState } from 'react';

type Order = 'ASK' | 'DESK' | null;
export const Card: React.FC = () => {
	const [orderBy, setOrderBy] = useState<Order>(null);
	const { products } = useAppSelector((state) => state.shop);

	const { id } = useParams<{ id: string }>();
	const [productsByCategories, setProductByCategories] = useState<IProduct[]>([]);
	useEffect(() => {
		if (id && orderBy === 'ASK') {
			setProductByCategories(() => [
				...products
					.filter((val) => val.category_id === id)
					.sort((a, b) => a.price - b.price),
			]);
		}
		if (id && orderBy === 'DESK') {
			setProductByCategories(() => [
				...products
					.filter((val) => val.category_id === id)
					.sort((a, b) => b.price - a.price),
			]);
		}
		if (id && !orderBy) {
			setProductByCategories(() => [
				...products.filter((val) => val.category_id === id),
			]);
		}
		if (!id && orderBy === 'ASK') {
			setProductByCategories(() => [...products.sort((a, b) => a.price - b.price)]);
		}
		if (!id && orderBy === 'DESK') {
			setProductByCategories(() => [...products.sort((a, b) => b.price - a.price)]);
		}
		if (!id && !orderBy) {
			setProductByCategories(() => [...products]);
		}
	}, [id, products, orderBy]);

	const clickHandler = () => {
		!orderBy
			? setOrderBy('DESK')
			: orderBy === 'DESK'
				? setOrderBy('ASK')
				: setOrderBy(null);
	};
	return (
		<>
			<div className={'flex flex-col items-end w-10/12'}>
				<button onClick={clickHandler}>Кнопка</button>
				{productsByCategories &&
					productsByCategories.map((val) => (
						<div
							key={val.id}
							className={
								'w-10/12 flex border border-solid border-gray-500 p-1 mb-2.5'
							}
						>
							<div className={'w-3/12'}>
								{val.image ? (
									<img src={val.image} alt="" />
								) : (
									'нет изобр.'
								)}
								{/*<img*/}
								{/*	src={*/}
								{/*		val.image*/}
								{/*			? val.image*/}
								{/*			: 'https://images.wallpaperscraft.com/image/single/lake_mountain_tree_36589_2650x1600.jpg'*/}
								{/*	}*/}
								{/*	alt=""*/}
								{/*/>*/}
							</div>
							<div className={'w-1/12'}></div>
							<div className={'flex w-full justify-between items-center'}>
								<div>
									<h1 className={'text-center'}>{val.name}</h1>
									<div>{`Стоимость ${val.price}р.`}</div>
								</div>
							</div>
							<NavLink to={`/product/${val.id}`}>Карточка</NavLink>
						</div>
					))}
			</div>
		</>
	);
};
