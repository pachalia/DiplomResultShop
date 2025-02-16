import { AddCategory, TableCategory } from '@components';
import { useAppSelector } from '@redux';

export const AdminCategory = () => {
	const { categories } = useAppSelector((state) => state.category);
	return (
		<div className={'w-full'}>
			<div style={{ position: 'relative', top: '30%' }}>
				{categories.length ? (
					<TableCategory />
				) : (
					<h1 className={'text-center text-2xl'}>Категорий нет</h1>
				)}
				<div className={'m-auto w-4/12'}>
					<AddCategory />
				</div>
			</div>
		</div>
	);
};
