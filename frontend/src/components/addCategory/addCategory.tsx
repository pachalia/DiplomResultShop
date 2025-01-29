import { useAppSelector } from '../../redux/hooks.ts';
import { useController, useForm } from 'react-hook-form';
import { CategoryService } from '../../services/category.service.ts';

type FormData = {
	name: string;
};

export const AddCategory = () => {
	const { current_user } = useAppSelector((state) => state.user);
	const {
		handleSubmit,
		control,
		reset,
		formState: { isValid },
	} = useForm<FormData>({ mode: 'onChange' });

	const { field: nameField } = useController({
		name: 'name',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
		},
	});

	const onSubmit = (data: FormData) => {
		if (current_user?.role === 'ADMIN') {
			CategoryService.addCategory(data.name);
			reset();
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...nameField}
					placeholder={'Категория'}
					className={'w-full p-3 border border-solid border-b-gray-800 mb-5'}
				/>
				<button
					type={'submit'}
					disabled={!isValid}
					className={isValid ? 'bg-blue-700 text-white' : undefined}
				>
					Добавить
				</button>
			</form>
		</>
	);
};
