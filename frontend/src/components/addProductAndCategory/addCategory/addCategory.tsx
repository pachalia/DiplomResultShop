import { useAppSelector } from '../../../redux/hooks.ts';
import { useForm } from 'react-hook-form';
import { CategoryService } from '../../../services';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';
import {
	AddCategoryFieldConfig,
	AddCategoryFormData,
} from '../../../inputConfigs/add.category.input.config.ts';

export const AddCategory = () => {
	const { current_user } = useAppSelector((state) => state.user);
	const formMethods = useForm<AddCategoryFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, AddCategoryFieldConfig);

	const onSubmit = (data: AddCategoryFormData) => {
		if (current_user?.role === 'ADMIN') {
			CategoryService.addCategory(data.category);
			formMethods.reset();
		}
	};
	return (
		<>
			<form onSubmit={formMethods.handleSubmit(onSubmit)}>
				{controllers.map(({ field, fieldState }, index) => (
					<label
						key={index}
						className={
							'flex flex-col p-1 border border-solid border-gray-400 mb-2.5 w-full'
						}
					>
						{field.name === 'category' && 'Категория:'}

						<input
							{...field}
							placeholder={'Введите категорию'}
							type={'text'}
							className={'w-full p-3 border-b-gray-800 border border-solid'}
						/>
						{fieldState.error && (
							<span style={{ color: 'red' }}>
								{fieldState.error.message}
							</span>
						)}
					</label>
				))}
				<button
					type={'submit'}
					disabled={!formMethods.formState.isValid}
					className={
						formMethods.formState.isValid
							? 'bg-blue-700 text-white'
							: undefined
					}
				>
					Отправить
				</button>
			</form>
		</>
	);
};
