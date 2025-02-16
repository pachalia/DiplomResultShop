import { CategoryTableForAdminLayoutCell } from './categoryTableForAdminLayoutCell.tsx';

interface EditState {
	isEditing: boolean;
	category: string;
}
interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}

interface ICategoryTableForAdminLayout {
	lineTable: string[];
	category: string[];
	clickHandler: (id: string) => void;
	handleCategoryChange: (id: string, category: string) => void;
	handleSaveCategory: (id: string) => void;
	editStates: EditStates;
	setEditStates: React.Dispatch<React.SetStateAction<EditStates>>;
}

export const CategoryTableForAdminLayout: React.FC<ICategoryTableForAdminLayout> = ({
	lineTable,
	category,
	editStates,
	handleCategoryChange,
	handleSaveCategory,
	clickHandler,
	setEditStates,
}) => {
	return (
		<div className={'w-full flex items-center flex-col'}>
			<table
				style={{
					width: '90%',
					margin: '0 auto',
					marginBottom: 40,
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
					{category.map((val, i) => {
						const editState = editStates[val] || {
							isEditing: false,
							category: val,
						};
						return (
							<CategoryTableForAdminLayoutCell
								key={val}
								value={val}
								index={i}
								editState={editState}
								handleCategoryChange={handleCategoryChange}
								handleSaveCategory={handleSaveCategory}
								clickHandler={clickHandler}
								setEditStates={setEditStates}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
