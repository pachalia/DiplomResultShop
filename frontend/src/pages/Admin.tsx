import { AddProduct } from '../components';
import { useAppSelector } from '../redux/hooks.ts';
import { ProductTableForAdmin } from '../components';

export const Admin = () => {
	const { categories } = useAppSelector((state) => state.category);
	return (
		<>
			{categories && <AddProduct categories={categories.map((val) => val)} />}
			<ProductTableForAdmin />
		</>
	);
};
