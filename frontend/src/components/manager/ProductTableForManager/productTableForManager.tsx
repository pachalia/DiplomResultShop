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
		[key: string]: { isEditing: boolean; price: number; quantity: number };
	}>({});

	const clickHandler = (id: string, price: number, quantity: number) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: true, price, quantity },
		}));
	};
	useEffect(() => {
		ProductService.getProducts();
	}, []);

	const handlePriceChange = (id: string, newPrice: number) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { ...prev[id], price: newPrice },
		}));
	};

	const handleQuantityChange = (id: string, newQuantity: number) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { ...prev[id], quantity: newQuantity },
		}));
	};

	const handleSavePrice = (id: string) => {
		ProductService.updateProduct({
			id,
			price: editStates[id].price,
			quantity: editStates[id].quantity,
		});
		setEditStates((prev) => ({
			...prev,
			[id]: {
				isEditing: false,
				price: prev[id].price,
				quantity: prev[id].quantity,
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
					handleQuantityChange={handleQuantityChange}
					handlePriceChange={handlePriceChange}
					handleSavePrice={handleSavePrice}
					editStates={editStates}
				/>
			) : (
				<div></div>
			)}
		</>
	);
};
