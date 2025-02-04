import { IProduct } from '../../interfaces/product.interface.ts';
import { ProductService } from '../../services';

interface EditState {
	isEditing: boolean;
	price: number;
}

interface ProductTableForAdminLayoutCellProps {
	value: IProduct;
	index: number;
	editState: EditState;
	clickHandler: (id: string, price: number) => void;
	handlePriceChange: (id: string, newPrice: number) => void;
	handleSavePrice: (id: string) => void;
}

const deleteClickHandler = (id: string) => {
	ProductService.deleteProducts(id);
};

export const ProductTableForAdminLayoutCell: React.FC<
	ProductTableForAdminLayoutCellProps
> = ({ value, index, editState, handleSavePrice, handlePriceChange, clickHandler }) => {
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
					{value.category_id}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{editState.isEditing ? (
						<div>
							<input
								type="number"
								value={editState.price}
								onChange={(e) =>
									handlePriceChange(value.id, +e.target.value)
								}
							/>
							<button onClick={() => handleSavePrice(value.id)}>
								Отпр.
							</button>
						</div>
					) : (
						<div className={'flex justify-between'}>
							{`${value.price}р.`}
							<button onClick={() => clickHandler(value.id, value.price)}>
								Редак.
							</button>
						</div>
					)}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{value.quantity}
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
