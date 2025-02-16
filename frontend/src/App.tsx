import { CategoryService, UserService } from '@services';
import { Routing } from '@routing';

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
