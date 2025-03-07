import { Card } from '@components';
import { useAppSelector } from '@redux';
import { ProductService } from '@services';
import { useEffect } from 'react';

export const Home: React.FC = () => {
	const { products } = useAppSelector((state) => state.product);

	useEffect(() => {
		ProductService.getProducts();
	}, []);

	return (
		<div className={' bg-amber-50 w-full mt-5'}>
			<div className={'w-1/12'}></div>
			<div
				className={'flex  w-11/12 m-auto items-center justify-between flex-wrap'}
			>
				{products?.data?.length
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
