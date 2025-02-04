import { CategoryService } from './services';
import { Routing } from './routing/routing.tsx';
import { UserService } from './services';

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
