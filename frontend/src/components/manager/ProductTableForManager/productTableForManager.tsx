import { useAppSelector } from '@redux';
import { useEffect, useState } from 'react';
import { ProductTableForManagerLayout } from './productTableForManagerLayout.tsx';
import { ProductService } from '@services';

const lineTable: string[] = [
	'№',
	'Продукт',
	'Категория',
	'Цена',
	'Количество',
	'Изобр.',
	'Удалить',
];

export const ProductTableForManager = () => {
	const { products } = useAppSelector((state) => state.product);
	const [editStates, setEditStates] = useState<{
		[key: string]: {
			price: { isEditing: boolean; val: number };
			quantity: { isEditing: boolean; val: number };
			category_id: { isEditing: boolean; val: string };
		};
	}>({});

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
		ProductService.getProducts();
	}, []);

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

	return (
		<>
			{products.length ? (
				<ProductTableForManagerLayout
					lineTable={lineTable}
					products={products}
					clickHandler={clickHandler}
					handleChange={handleChange}
					handleSave={handleSave}
					editStates={editStates}
					handleCancel={handleCancel}
				/>
			) : (
				<div></div>
			)}
		</>
	);
};
