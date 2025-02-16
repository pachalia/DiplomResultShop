import { useAppSelector } from '@redux';
import { useState } from 'react';
import { CategoryService } from '@services';
import { CategoryTableForAdminLayout } from './categoryTableForAdminLayout.tsx';

const lineTable: string[] = ['№', 'Категория', 'Удалить'];
export const TableCategory = () => {
	const { categories } = useAppSelector((state) => state.category);
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; category: string };
	}>({});

	const clickHandler = (category: string) => {
		setEditStates((prev) => ({
			...prev,
			[category]: { isEditing: true, category },
		}));
	};

	const handleCategoryChange = (id: string, newCategory: string) => {
		setEditStates((prev) => ({
			...prev,
			[id]: { ...prev[id], category: newCategory },
		}));
	};

	const handleSaveCategory = (id: string) => {
		CategoryService.updateCategory(id, editStates[id].category);
		setEditStates((prev) => ({
			...prev,
			[id]: { isEditing: false, category: prev[id].category },
		}));
	};

	return (
		<>
			<CategoryTableForAdminLayout
				lineTable={lineTable}
				clickHandler={clickHandler}
				editStates={editStates}
				category={categories}
				handleCategoryChange={handleCategoryChange}
				handleSaveCategory={handleSaveCategory}
				setEditStates={setEditStates}
			/>
		</>
	);
};
