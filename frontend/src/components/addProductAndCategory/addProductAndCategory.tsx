import { AddCategory } from '@components';
import { AddProduct } from '@components';

export const AddProductAndCategory = () => {
	return (
		<div className={'flex items-center flex-col justify-around'}>
			<AddCategory />
			<AddProduct />
		</div>
	);
};
