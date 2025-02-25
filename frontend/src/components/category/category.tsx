import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategoryService } from '@services';
import { PaginationResponse } from '../../responses/pagination.response.ts';
import { ICategory } from '@interfaces';

export const Category = () => {
	const [categories, setCategories] = useState<PaginationResponse<ICategory[]>>();
	useEffect(() => {
		CategoryService.getUserCategory().then((res) => setCategories(res.data));
	}, []);

	return (
		<>
			<aside className={'flex flex-col w-4/12 justify-center items-center'}>
				{categories?.data &&
					categories.data.map((val, i) => (
						<NavLink key={i} to={`categories/${val.name}`}>
							{val.name}
						</NavLink>
					))}
			</aside>
			<Outlet />
		</>
	);
};
