import { useAppDispatch } from './redux/hooks.ts';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { CategoryService } from './services/category.service.ts';
import { Routing } from './routing.tsx';
import { setUser } from './redux/features/slices/userSlice.ts';
import { IUser } from './interfaces/user.interface.ts';

function App() {
	const dispatch = useAppDispatch();
	const token = window.localStorage.getItem('token');
	const _user = token ? jwtDecode<IUser>(token) : null;
	CategoryService.getCategory();
	useEffect(() => {
		if (_user) dispatch(setUser(_user));
	}, []);
	return (
		<>
			<Routing />
		</>
	);
}

export default App;
