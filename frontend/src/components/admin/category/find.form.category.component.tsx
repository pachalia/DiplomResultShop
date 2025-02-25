import { Button } from '@components';
import { useForm } from 'react-hook-form';
import { useFormControllers } from '../../../hooks/form-controllers.hook.ts';
import { findCategoryFieldConfig, findCategoryFormData } from '@inputs';

interface findFormUsersProps {
	onSubmit: (data: findCategoryFormData) => void;
}
export const FindFormCategoryComponent: React.FC<findFormUsersProps> = ({ onSubmit }) => {
	const formMethods = useForm<findCategoryFormData>();
	const controllers = useFormControllers(formMethods, findCategoryFieldConfig);
	return (
		<form onSubmit={formMethods.handleSubmit(onSubmit)} className={'flex'}>
			{controllers.map(({ field }, index) => (
				<label
					key={index}
					className={
						'flex flex-col p-1 border border-solid border-gray-400 mb-2.5'
					}
				>
					{field.name === 'category' && 'Категория для поиска:'}
					<input
						{...field}
						placeholder={'Категория для поиска'}
						type={'text'}
						className={'w-full p-3 border-b-gray-800 border border-solid'}
					/>
				</label>
			))}
			<Button type={'submit'} title={'Найти'} />
		</form>
	);
};
