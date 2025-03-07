import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductService } from '@services';
import { Card } from '@components';
import { setProducts, useAppDispatch, useAppSelector } from '@redux';

export const ProductByCategories = () => {
	const { id } = useParams();
	const { products } = useAppSelector((state) => state.product);
	const dispatch = useAppDispatch();

	useEffect(() => {
		id &&
			ProductService.getProducts({ category: id }).then(
				(res) => res && dispatch(setProducts(res)),
			);
	}, [id]);

	return (
		<div className={'bg-amber-50 w-full mt-5'}>
			<div className={'w-1/12'}></div>
			<div
				className={'flex  w-11/12 m-auto items-center justify-between flex-wrap'}
			>
				{products.data.length
					? products.data.map((val) => (
							<div className={'w-3/12 pr-4'} key={val.id}>
								<Card
									id={val.id}
									price={val.price}
									name={val.name}
									image={val.image}
								/>
							</div>
						))
					: ''}
			</div>
		</div>
	);
};
