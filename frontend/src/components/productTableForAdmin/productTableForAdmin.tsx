import { useAppSelector } from '../../redux/hooks.ts';
import { useState } from 'react';
import { ProductTableForAdminLayout } from './productTableForAdminLayout.tsx';
import { ProductService } from '../../services/product.service.ts';

const lineTable: string[] = [
	'№',
	'Продукт',
	'Категория',
	'Цена',
	'Количество',
	'Изобр.',
	'Удалить',
];

export const ProductTableForAdmin = () => {
	const { products } = useAppSelector((state) => state.product);
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; price: number };
	}>({});

	const clickHandler = (id: string, price: number) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: true, price: price },
		}));
	};

	const handlePriceChange = (id: string, newPrice: number) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { ...prev[id], price: newPrice },
		}));
	};

	const handleSavePrice = (id: string) => {
		ProductService.updateProduct({ id, price: editStates[id].price });
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: false, price: prev[id].price },
		}));
	};

	return (
		<>
			{products.length && (
				<ProductTableForAdminLayout
					lineTable={lineTable}
					products={products}
					clickHandler={clickHandler}
					handlePriceChange={handlePriceChange}
					handleSavePrice={handleSavePrice}
					editStates={editStates}
				/>
			)}
		</>
	);
};
