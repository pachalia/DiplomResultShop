import { AddCategory, TableCategory } from '@components';

export const AdminCategory = () => {
	return (
		<div className={'w-full'}>
			<div style={{ position: 'relative', top: '30%' }}>
				<TableCategory />
				<div className={'m-auto w-4/12'}>
					<AddCategory />
				</div>
			</div>
		</div>
	);
};
