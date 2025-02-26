import { setCategories, useAppDispatch, useAppSelector } from '@redux';
import { useEffect, useState } from 'react';
import { CategoryService } from '@services';
import { CategoryTableForAdminLayout } from './categoryTableForAdminLayout.tsx';
import { Pagination } from '../../pagination/pagination.tsx';
import { Spinner } from '../../UI/spinner/spinner.tsx';
import { FindFormCategoryComponent } from './find.form.category.component.tsx';
import { findCategoryFormData } from '@inputs';

const lineTable: string[] = ['№', 'Категория', 'Действие'];
const LIMIT = 4;
export const TableCategory = () => {
	const { categories } = useAppSelector((state) => state.category);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; category: string };
	}>({});
	const [loading, setLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const [findCategory, setFindCategory] = useState<{ name: string }[]>([]);
	const [isFind, setIsFind] = useState<boolean>(false);

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
	const onSubmit = async (data: findCategoryFormData) => {
		data.category
			? CategoryService.findCategory(data.category).then((res) => {
					setIsFind(true);
					setFindCategory(res);
				})
			: setIsFind(false);
	};
	useEffect(() => {
		const offset = +(currentPage - 1) * LIMIT;
		CategoryService.getCategory(offset.toString(), LIMIT.toString(), 'desc').then(
			(res) => {
				setLoading(false);
				dispatch(setCategories(res.data));
			},
		);
	}, [dispatch, currentPage]);

	const totalPages = categories?.total ? Math.ceil(categories.total / LIMIT) : 0;

	return (
		<>
			<FindFormCategoryComponent onSubmit={onSubmit} />
			{!loading ? (
				<>
					<CategoryTableForAdminLayout
						findCategory={findCategory}
						isFind={isFind}
						lineTable={lineTable}
						clickHandler={clickHandler}
						editStates={editStates}
						handleCategoryChange={handleCategoryChange}
						handleSaveCategory={handleSaveCategory}
						setEditStates={setEditStates}
					/>
					{!isFind && totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={setCurrentPage}
							load={setLoading}
						/>
					)}
				</>
			) : (
				<div className={'flex justify-center'}>
					<Spinner />
				</div>
			)}
		</>
	);
};
