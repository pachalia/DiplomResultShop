import { setProducts, useAppDispatch, useAppSelector } from '@redux';
import { useEffect, useState } from 'react';
import { ProductTableForManagerLayout } from './productTableForManagerLayout.tsx';
import { ProductService } from '@services';
import { Pagination } from '../../pagination/pagination.tsx';
import { Spinner } from '../../UI/spinner/spinner.tsx';

const lineTable: string[] = [
	'№',
	'Продукт',
	'Категория',
	'Цена',
	'Количество',
	'Изобр.',
	'Удалить',
];

const LIMIT = 4;

export const ProductTableForManager = () => {
	const { products } = useAppSelector((state) => state.product);
	const dispatch = useAppDispatch();
	const [editStates, setEditStates] = useState<{
		[key: string]: {
			price: { isEditing: boolean; val: number };
			quantity: { isEditing: boolean; val: number };
			category_id: { isEditing: boolean; val: string };
		};
	}>({});

	const [pagination, setPagination] = useState<{
		currentPage: number;
		loading: boolean;
	}>({ currentPage: 1, loading: true });

	const clickHandler = (
		id: string,
		price?: number,
		quantity?: number,
		category_id?: string,
	) => {
		setEditStates((prev) => ({
			...prev,
			[id]: {
				price:
					price !== undefined
						? { isEditing: true, val: price }
						: prev[id]?.price || { isEditing: false, val: 0 },
				quantity:
					quantity !== undefined
						? { isEditing: true, val: quantity }
						: prev[id]?.quantity || { isEditing: false, val: 0 },
				category_id:
					category_id !== undefined
						? { isEditing: true, val: category_id }
						: prev[id]?.category_id || { isEditing: false, val: '' },
			},
		}));
	};

	useEffect(() => {
		const offset = (pagination.currentPage - 1) * LIMIT;
		ProductService.getProducts({ order: 'desc', offset, limit: LIMIT }).then(
			(res) => {
				setPagination({ ...pagination, loading: false });
				res && dispatch(setProducts(res));
			},
		);
	}, [pagination.currentPage]);

	const handleChange = (
		id: string,
		options: 'price' | 'quantity' | 'category_id',
		newValue: number | string,
	) => {
		setEditStates((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				[options]: { ...prev[id][options], val: newValue },
			},
		}));
	};

	const handleCancel = (id: string, options: 'price' | 'quantity' | 'category_id') => {
		setEditStates((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				[options]: { ...prev[id][options], isEditing: false },
			},
		}));
	};

	const handleSave = (id: string, category: 'price' | 'quantity' | 'category_id') => {
		const updateData = {
			id,
			[category]: editStates[id][category].val, // Динамическое обращение к свойству
		};

		ProductService.updateProduct(updateData);

		setEditStates((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				[category]: { ...prev[id][category], isEditing: false }, // Динамическое обращение к свойству
			},
		}));
	};

	const totalPages = products.total ? Math.ceil(products.total / LIMIT) : 0;

	return (
		<>
			{!pagination.loading && products.data ? (
				<div className={'flex flex-col w-full'}>
					<ProductTableForManagerLayout
						lineTable={lineTable}
						products={products.data}
						clickHandler={clickHandler}
						handleChange={handleChange}
						handleSave={handleSave}
						editStates={editStates}
						handleCancel={handleCancel}
					/>
					<div className={'flex justify-center items-center'}>
						<h2 className={'text-2xl font-bold'}>
							{' '}
							Найдено:{' '}
							<span className={'text-red-700'}>
								{products.total} продуктов
							</span>
						</h2>
						<Pagination
							pagination={pagination}
							totalPages={totalPages}
							setPagination={setPagination}
						/>
					</div>
				</div>
			) : (
				<div className={'m-auto'}>{<Spinner />}</div>
			)}
		</>
	);
};
