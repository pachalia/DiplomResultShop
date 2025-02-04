import { ProductTableForAdmin } from '../../components';
import { AddProductAndCategory } from '../../components/addProductAndCategory/addProductAndCategory.tsx';

export const Admin = () => {
	return (
		<>
			<AddProductAndCategory />
			<ProductTableForAdmin />
		</>
	);
};
