import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/product.interface.ts';
import { ProductService, CartService } from '../services';
import { useAppSelector } from '../redux/hooks.ts';
import { Button, ButtonColors } from '../components';
import { useForm } from 'react-hook-form';
import { addProductToCartFieldConfig, AddProductToCartFormData } from '../inputConfigs';

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
	}, []);
	const clickButtonHandler = () => {
		navigate('/login');
	};
	const onSubmit = (data: AddProductToCartFormData) => {
		id && CartService.addProductToCart(id, data.quantity.toString());
	};
	return (
		<div className={'w-full'}>
			<div className="w-10/12 m-auto relative top-1/3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
				{product?.image && (
					<img className="rounded-t-lg m-auto" src={product.image} alt="" />
				)}
				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
						{product && product.name}
					</h5>

					<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						{`Описание товара: ${product?.description}`}
					</h5>
				</div>
				<div className={'flex justify-between items-center'}>
					<div>{`Цена: ${product && product.price}р.`}</div>
					{!current_user && (
						<Button title={'Войти'} onClick={clickButtonHandler} />
					)}
					{current_user && (
						<form
							onSubmit={formMethods.handleSubmit(onSubmit)}
							className={'contents'}
						>
							{controllers.map(({ field, fieldState }, index) => {
								return (
									<>
										<label
											key={index}
											className={
												'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-2/12'
											}
										>
											{field.name === 'quantity' && 'Количество:'}
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
												className={
													'w-full p-3 border-b-gray-800 border border-solid'
												}
											/>
											{fieldState.error && (
												<span style={{ color: 'red' }}>
													{fieldState.error.message}
												</span>
											)}
										</label>
										<div>
											{`Общая стоимость ${product && product.price * field.value}р.`}
										</div>
									</>
								);
							})}
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
