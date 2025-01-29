import { CategoryService } from './services/category.service.ts';
import { Routing } from './routing.tsx';
import { UserService } from './services/user.service.ts';

function App() {
	CategoryService.getCategory();
	UserService.getCurrentUser();

	return (
		<>
			<Routing />
		</>
	);
}

export default App;
