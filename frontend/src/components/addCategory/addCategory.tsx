import { useAppDispatch } from '../../redux/hooks.ts';
import { useController, useForm } from 'react-hook-form';
import axios from 'axios';
import { URL_API_CATEGORIES } from '../../constans/url.constans.ts';
import { addCategory } from '../../redux/features/slices/shopSlice.ts';

type FormData = {
	name: string;
};

export const AddCategory = () => {
	const token = window.localStorage.getItem('token');
	const dispatch = useAppDispatch();
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
		if (token)
			axios
				.post(URL_API_CATEGORIES, data, { headers: { Authorization: 'token' } })
				.then((res) => {
					dispatch(addCategory(res.data.name));
					reset();
				});
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
