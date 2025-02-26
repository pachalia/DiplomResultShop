import { CategoryService } from '@services';
import { Button } from '../../UI/button';
import { useState } from 'react';
import { Modal } from '../../modal/modal.tsx';

interface EditState {
	isEditing: boolean;
	category: string;
}

interface EditStates {
	[key: string]: EditState; // Ключи - строки, значения - объекты типа EditState
}

interface CategoryTableForAdminLayoutCellProps {
	value: string;
	index: number;
	editState: EditState;
	clickHandler: (id: string) => void;
	handleCategoryChange: (id: string, category: string) => void;
	handleSaveCategory: (id: string) => void;
	setEditStates: React.Dispatch<React.SetStateAction<EditStates>>;
}

export const CategoryTableForAdminLayoutCell: React.FC<
	CategoryTableForAdminLayoutCellProps
> = ({
	value,
	index,
	editState,
	handleSaveCategory,
	handleCategoryChange,
	clickHandler,
	setEditStates,
}) => {
	const [modal, setModal] = useState<{ id: string; isModal: boolean } | null>(null);
	const deleteClickHandler = () => {
		modal?.id && CategoryService.deleteCategory(modal?.id);
	};
	return (
		<>
			{modal?.isModal && (
				<div>
					<Modal
						message={
							'Удалить категорию? В случае удаления категории все продукты этой категории также удалятся.'
						}
						callback={deleteClickHandler}
						setModal={setModal}
					/>
				</div>
			)}

			<tr className={'border border-solid border-gray-500'}>
				<td className={'border border-solid border-gray-500 text-center'}>
					{index + 1}
				</td>
				<td className={'border border-solid border-gray-500 text-center'}>
					{editState.isEditing ? (
						<div>
							<input
								value={editState.category}
								onChange={(e) =>
									handleCategoryChange(value, e.target.value)
								}
							/>
							<div className={'flex justify-between'}>
								<Button
									onClick={() => handleSaveCategory(value)}
									title={'Сохранить'}
								/>
								<Button
									onClick={() => {
										setEditStates((prev) => ({
											...prev,
											[value]: {
												...prev[value],
												isEditing: false,
											},
										}));
									}}
									title={'Отмена'}
								/>
							</div>
						</div>
					) : (
						<div className={'flex justify-between'}>
							{`${value}`}
							<Button
								onClick={() => clickHandler(value)}
								title={'Редак.'}
							/>
						</div>
					)}
				</td>
				<td className={'border border-solid border-gray-500'}>
					<div className={'w-full m-auto'}></div>
					<Button
						onClick={() => {
							setModal({ id: value, isModal: true });
						}}
						title={'Удалить'}
					/>
				</td>
			</tr>
		</>
	);
};
