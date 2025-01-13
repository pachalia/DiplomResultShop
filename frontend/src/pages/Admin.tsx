import { AddProduct } from '../components/addProduct/addProduct.tsx';
import { useAppSelector } from '../redux/hooks.ts';
import { ProductTableForAdmin } from '../components/productTableForAdmin/productTableForAdmin.tsx';

export const Admin = () => {
	const { categories } = useAppSelector((state) => state.shop);
	return (
		<>
			{categories && <AddProduct categories={categories.map((val) => val)} />}
			<ProductTableForAdmin />
		</>
	);
};
