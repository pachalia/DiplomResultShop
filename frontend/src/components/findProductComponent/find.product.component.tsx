import { useForm } from 'react-hook-form';
import { findProductFieldConfig, FindProductFormData } from '@inputs';
import { useFormControllers } from '../../hooks/form-controllers.hook.ts';
import { ProductService } from '@services';
import { setFindProducts, useAppDispatch } from '@redux';
import { useNavigate } from 'react-router-dom';

export const FindProductComponent = () => {
	const formMethods = useForm<FindProductFormData>();
	const controllers = useFormControllers(formMethods, findProductFieldConfig);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onSubmit = (data: FindProductFormData) => {
		ProductService.getProducts({ product: data.product }).then((res) => {
			res && dispatch(setFindProducts(res));
			formMethods.reset();
			navigate('/find');
		});
	};
	return (
		<>
			<form onSubmit={formMethods.handleSubmit(onSubmit)} className={'flex'}>
				{controllers.map(({ field }, index) => (
					<input
						key={index}
						{...field}
						type="text"
						placeholder={'Поиск в магазине'}
					/>
				))}
				<button type={'submit'}>
					<img
						src="/images/search-svgrepo-com.svg"
						width={'30px'}
						height={'30px'}
						alt=""
					/>
				</button>
			</form>
		</>
	);
};
