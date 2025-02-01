import { AddCategory } from './addCategory/addCategory.tsx';
import { AddProduct } from './addProduct/addProduct.tsx';

export const AddProductAndCategory = () => {
	return (
		<div className={'flex items-center flex-col justify-around'}>
			<AddCategory />
			<AddProduct />
		</div>
	);
};
