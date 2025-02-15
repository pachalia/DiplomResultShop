import { ProductTableForAdminLayoutCell } from './productTableForAdminLayoutCell.tsx';
import { IProduct } from '../../interfaces/product.interface.ts';

interface EditState {
	isEditing: boolean;
	price: number;
}
interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}
interface IProductTableForAdminLayout {
	lineTable: string[];
	products: IProduct[];
	clickHandler: (id: string, price: number) => void;
	handlePriceChange: (id: string, newPrice: number) => void;
	handleSavePrice: (id: string) => void;
	editStates: EditStates;
}
export const ProductTableForAdminLayout: React.FC<IProductTableForAdminLayout> = ({
	products,
	handlePriceChange,
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
							<ProductTableForAdminLayoutCell
								key={val.id}
								value={val}
								index={i}
								editState={editState}
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
