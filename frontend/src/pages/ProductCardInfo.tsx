import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProduct } from '@interfaces';
import { ProductService, CartService } from '@services';
import { useAppSelector } from '@redux';
import { Button, ButtonColors } from '@components';
import { useForm } from 'react-hook-form';
import { addProductToCartFieldConfig, AddProductToCartFormData } from '@inputs';
import { useFormControllers } from '../hooks/form-controllers.hook.ts';

export const ProductCardInfo = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<IProduct>();
	const navigate = useNavigate();
	const { current_user } = useAppSelector((state) => state.user);
	const formMethods = useForm<AddProductToCartFormData>();
	const controllers = useFormControllers(formMethods, addProductToCartFieldConfig);

	useEffect(() => {
		id && ProductService.getProductById(id).then((res) => setProduct(res));
	}, [id]);

	const clickButtonHandler = () => {
		navigate('/login');
	};

	const onSubmit = (data: AddProductToCartFormData) => {
		id && CartService.addProductToCart(id, data.quantity.toString());
	};

	return (
		<div className="w-full flex justify-center py-8">
			<div className="w-10/12 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
				{product?.image && (
					<img
						className="rounded-t-lg w-full h-64 object-cover"
						src={product.image}
						alt={product.name}
					/>
				)}
				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
						{product?.name}
					</h5>

					<h5 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
						{`Описание товара: ${product?.description}`}
					</h5>

					<div className="mt-4 mb-6 text-lg font-bold text-gray-800 dark:text-gray-200">
						{`Цена: ${product?.price} р.`}
					</div>

					{!current_user ? (
						<Button title={'Войти'} onClick={clickButtonHandler} />
					) : (
						<form
							onSubmit={formMethods.handleSubmit(onSubmit)}
							className="flex flex-col items-center"
						>
							{controllers.map(({ field, fieldState }, index) => (
								<div key={index} className="mb-4 w-full">
									<label className="flex flex-col">
										<span className="text-gray-600">
											{field.name === 'quantity'
												? 'Количество:'
												: ''}
										</span>
										<input
											{...field}
											placeholder={
												field.name === 'quantity'
													? 'Введите количество'
													: undefined
											}
											type={
												field.name.includes('quantity')
													? 'number'
													: undefined
											}
											className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
										{fieldState.error && (
											<span className="text-red-500 text-sm mt-1">
												{fieldState.error.message}
											</span>
										)}
									</label>
									<div className="mt-2 text-gray-700">
										{`Общая стоимость: ${product && product?.price * field.value} р.`}
									</div>
								</div>
							))}
							<Button
								type={'submit'}
								backgroundColor={ButtonColors.PRIMARY}
								title={'В корзину'}
							/>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};
