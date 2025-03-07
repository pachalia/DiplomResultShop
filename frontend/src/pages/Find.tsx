import { Card } from '@components';
import { products, setFindProducts, useAppDispatch, useAppSelector } from '@redux';
import { useEffect } from 'react';

export const Find: React.FC = () => {
	const { findProducts } = useAppSelector((state) => state.product);
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			dispatch(setFindProducts(products));
		};
	}, []);

	return (
		<div className={' bg-amber-50 w-full mt-5'}>
			<div className={'w-1/12'}></div>
			<div
				className={'flex  w-10/12 m-auto items-center justify-between flex-wrap'}
			>
				{findProducts?.data?.length ? (
					findProducts.data.map((val) => (
						<div className={'w-5/12'} key={val.id}>
							<Card
								id={val.id}
								price={val.price}
								name={val.name}
								image={val.image}
							/>
						</div>
					))
				) : (
					<h2>Продукты не найдены</h2>
				)}
			</div>
		</div>
	);
};
