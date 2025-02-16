import { useForm } from 'react-hook-form';
import { CategoryService, Message } from '@services';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';
import { AddCategoryFieldConfig, AddCategoryFormData } from '@inputs';
import { Button } from '../../UI/button';
import { AxiosError } from 'axios';

export const AddCategory = () => {
	const formMethods = useForm<AddCategoryFormData>({ mode: 'onChange' });
	const controllers = useFormControllers(formMethods, AddCategoryFieldConfig);

	const onSubmit = (data: AddCategoryFormData) => {
		CategoryService.addCategory(data.category)
			.then(() => {
				Message.success('Категория добавлена');
				formMethods.reset();
			})
			.catch((e: AxiosError) =>
				e.status === 409
					? Message.danger('Такая категория уже существует')
					: Message.danger(e.message),
			);
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
						{field.name === 'category' && 'Добавить категорию:'}

						<input
							{...field}
							placeholder={'Введите категорию для добавления'}
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
				{formMethods.formState.isValid && (
					<Button type={'submit'} title={'Отправить'} />
				)}
				<div className={'m-auto'}></div>
			</form>
		</>
	);
};
