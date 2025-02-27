import { ProductTableForManagerLayoutCell } from './productTableForManagerLayoutCell.tsx';
import { IProduct } from '@interfaces';

interface EditState {
	price: { isEditing: boolean; val: number };
	quantity: { isEditing: boolean; val: number };
	category_id: { isEditing: boolean; val: string };
}
interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}
interface IProductTableForAdminLayout {
	lineTable: string[];
	products: IProduct[];
	clickHandler: (
		id: string,
		price?: number,
		quantity?: number,
		category_id?: string,
	) => void;
	handleCancel: (id: string, options: 'price' | 'quantity' | 'category_id') => void;
	handleChange: (
		id: string,
		options: 'price' | 'quantity' | 'category_id',
		newValue: number | string,
	) => void;
	handleSave: (id: string, category: 'price' | 'quantity' | 'category_id') => void;
	editStates: EditStates;
}
export const ProductTableForManagerLayout: React.FC<IProductTableForAdminLayout> = ({
	products,
	handleChange,
	handleSave,
	lineTable,
	clickHandler,
	editStates,
	handleCancel,
}) => {
	return (
		<div className={'w-full flex items-center flex-col'}>
			<div className={'w-full relative top-1/4'}>
				<h1 className={'text-center text-2xl font-bold'}>Панель менеджера</h1>
				<table
					style={{
						width: '100%',
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
										width: i === 1 || i === 3 ? '15%' : 'inherit',
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
								quantity: val.quantity,
								category_id: val.category_id,
							};
							return (
								<ProductTableForManagerLayoutCell
									key={val.id}
									value={val}
									index={i}
									editState={editState}
									handleChange={handleChange}
									handleSave={handleSave}
									clickHandler={clickHandler}
									handleCancel={handleCancel}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
