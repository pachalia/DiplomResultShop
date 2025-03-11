import { Card, Pagination, Spinner } from '@components';
import { setProducts, useAppDispatch, useAppSelector } from '@redux';
import { ProductService } from '@services';
import { useEffect, useState } from 'react';

const LIMIT = 8;
export const Home: React.FC = () => {
	const { products } = useAppSelector((state) => state.product);
	const dispatch = useAppDispatch();
	const [pagination, setPagination] = useState<{
		currentPage: number;
		loading: boolean;
	}>({ currentPage: 1, loading: true });

	useEffect(() => {
		const offset = (pagination.currentPage - 1) * LIMIT;
		ProductService.getProducts({ order: 'desc', offset, limit: LIMIT }).then(
			(res) => {
				if (res) {
					setPagination({ ...pagination, loading: false });
					dispatch(setProducts(res));
				}
			},
		);
	}, [pagination.currentPage, dispatch]);
	const totalPages = products.total ? Math.ceil(products.total / LIMIT) : 0;
	return (
		<div className={' bg-amber-50 w-full mt-5'}>
			<div className={'w-1/12'}></div>
			<div
				className={'flex  w-11/12 m-auto items-center justify-between flex-wrap'}
			>
				{!pagination.loading ? (
					<>
						{products?.data?.length
							? products.data.map((val) => (
									<div className={'w-3/12 pr-4'} key={val.id}>
										<Card
											id={val.id}
											price={val.price}
											quantity={val.quantity}
											name={val.name}
											image={val.image}
										/>
									</div>
								))
							: ''}
						{totalPages > 1 && (
							<div className={'w-full'}>
								<Pagination
									pagination={pagination}
									setPagination={setPagination}
									totalPages={totalPages}
								/>
							</div>
						)}
					</>
				) : (
					<div className={'flex justify-center w-full'}>
						<Spinner />
					</div>
				)}
			</div>
		</div>
	);
};
