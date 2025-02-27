import { IProduct } from '@interfaces';
import { CategoryService, ProductService } from '@services';
import { useEffect, useState } from 'react';
import { Button } from '@components';

interface EditState {
	price: { isEditing: boolean; val: number };
	quantity: { isEditing: boolean; val: number };
	category_id: { isEditing: boolean; val: string };
}

interface ProductTableForAdminLayoutCellProps {
	value: IProduct;
	index: number;
	editState: EditState;
	clickHandler: (
		id: string,
		price?: number,
		quantity?: number,
		category_id?: string,
	) => void;
	handleChange: (
		id: string,
		options: 'price' | 'quantity' | 'category_id',
		newValue: number | string,
	) => void;
	handleCancel: (id: string, options: 'price' | 'quantity' | 'category_id') => void;
	handleSave: (id: string, category: 'price' | 'quantity' | 'category_id') => void;
}

const deleteClickHandler = (id: string) => {
	ProductService.deleteProducts(id);
};

export const ProductTableForManagerLayoutCell: React.FC<
	ProductTableForAdminLayoutCellProps
> = ({
	value,
	index,
	editState,
	handleSave,
	handleChange,
	clickHandler,
	handleCancel,
}) => {
	const [categories, setCategories] = useState<string[]>([]);
	useEffect(() => {
		CategoryService.getCategory().then((res) => {
			const category = res.data.data.map((val) => {
				return val.name;
			});
			setCategories(category);
		});
	}, []);
	return (
		<>
			<tr className={'border border-solid border-gray-500'}>
				<td className={'border border-solid border-gray-500 text-center'}>
					{index + 1}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.name}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{editState.category_id.isEditing && categories.length ? (
						<div>
							<select
								value={editState.category_id.val}
								onChange={(e) => {
									handleChange(value.id, 'category_id', e.target.value);
								}}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
							<div className={'flex justify-between'}>
								<Button
									onClick={() => handleSave(value.id, 'category_id')}
									title={'Сохранить'}
								/>
								<Button
									onClick={() => {
										handleCancel(value.id, 'category_id');
									}}
									title={'Отмена'}
								/>
							</div>
						</div>
					) : (
						<div className={'flex justify-between'}>
							{value.category_id}
							<Button
								onClick={() =>
									clickHandler(
										value.id,
										undefined,
										undefined,
										value.category_id,
									)
								}
								title={'Редактировать'}
							/>
						</div>
					)}
				</td>
				{/*price*/}
				<td className={'border border-solid border-gray-500 text-center'}>
					{editState.price.isEditing ? (
						<div>
							<input
								type="number"
								value={editState.price.val}
								onChange={(e) =>
									handleChange(value.id, 'price', +e.target.value)
								}
							/>
							<button onClick={() => handleSave(value.id, 'price')}>
								Отпр.
							</button>
						</div>
					) : (
						<div className={'flex justify-between'}>
							{`${value.price}р.`}
							<button
								onClick={() => {
									clickHandler(value.id, value.price);
								}}
							>
								Редак.
							</button>
						</div>
					)}
				</td>
				{/*quantity*/}
				<td className={'border border-solid border-gray-500 text-center'}>
					{editState.quantity.isEditing ? (
						<div>
							<input
								type="number"
								value={editState.quantity.val}
								onChange={(e) =>
									handleChange(value.id, 'quantity', +e.target.value)
								}
							/>
							<button onClick={() => handleSave(value.id, 'quantity')}>
								Отпр.
							</button>
						</div>
					) : (
						<div className={'flex justify-between'}>
							{value.quantity}
							<button
								onClick={() =>
									clickHandler(value.id, undefined, value.quantity)
								}
							>
								Редак.
							</button>
						</div>
					)}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.image ? (
						<img src={value.image} alt="" className={'m-auto'} />
					) : (
						'нет изобр'
					)}
				</td>
				<td className={'border border-solid border-gray-500'}>
					<button onClick={() => deleteClickHandler(value.id)}>Удалить</button>
				</td>
			</tr>
		</>
	);
};
