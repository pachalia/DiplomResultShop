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
	const [pagination, setPagination] = useState<{
		currentPage: number;
		loading: boolean;
	}>({ currentPage: 1, loading: true });
	const [editStates, setEditStates] = useState<{
		[key: string]: { isEditing: boolean; category: string };
	}>({});

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
		const offset = +(pagination.currentPage - 1) * LIMIT;
		CategoryService.getCategory(offset.toString(), LIMIT.toString(), 'desc').then(
			(res) => {
				setPagination({ ...pagination, loading: false });
				dispatch(setCategories(res.data));
			},
		);
	}, [dispatch, pagination.currentPage]);

	const totalPages = categories?.total ? Math.ceil(categories.total / LIMIT) : 0;

	return (
		<>
			<FindFormCategoryComponent onSubmit={onSubmit} />
			{!pagination.loading ? (
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
							pagination={pagination}
							totalPages={totalPages}
							setPagination={setPagination}
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
