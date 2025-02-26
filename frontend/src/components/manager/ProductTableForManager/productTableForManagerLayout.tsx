import { ProductTableForManagerLayoutCell } from './productTableForManagerLayoutCell.tsx';
import { IProduct } from '@interfaces';

interface EditState {
	isEditing: boolean;
	price: number;
	quantity: number;
}
interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}
interface IProductTableForAdminLayout {
	lineTable: string[];
	products: IProduct[];
	clickHandler: (id: string, price: number, quantity: number) => void;
	handlePriceChange: (id: string, newPrice: number) => void;
	handleQuantityChange: (id: string, newQuantity: number) => void;
	handleSavePrice: (id: string) => void;
	editStates: EditStates;
}
export const ProductTableForManagerLayout: React.FC<IProductTableForAdminLayout> = ({
	products,
	handlePriceChange,
	handleQuantityChange,
	handleSavePrice,
	lineTable,
	clickHandler,
	editStates,
}) => {
	return (
		<div className={'w-full flex items-center flex-col'}>
			<table
				style={{
					width: '90%',
					margin: '0 auto',
					marginBottom: 40,
					position: 'relative',
					top: '30%',
				}}
			>
				<thead>
					<tr>
						{lineTable.map((val, i) => (
							<th
								style={{
									border: '1px solid black',
									width: i === 1 || i === 3 ? '30%' : 'inherit',
								}}
								key={i}
							>
								{val}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{products.map((val, i) => {
						const editState = editStates[val.id] || {
							isEditing: false,
							price: val.price,
						};
						return (
							<ProductTableForManagerLayoutCell
								key={val.id}
								value={val}
								index={i}
								editState={editState}
								handleQuantityChange={handleQuantityChange}
								handlePriceChange={handlePriceChange}
								handleSavePrice={handleSavePrice}
								clickHandler={clickHandler}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
