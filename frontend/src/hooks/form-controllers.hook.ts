import {
	Path,
	PathValue,
	RegisterOptions,
	useController,
	UseFormReturn,
	FieldValues,
} from 'react-hook-form';

type FieldConfig<T extends FieldValues> = {
	// Добавляем ограничение FieldValues
	name: Path<T>;
	defaultValue?: PathValue<T, Path<T>>;
	rules?: RegisterOptions<T, Path<T>>;
};

export const useFormControllers = <T extends FieldValues>( // Добавляем ограничение FieldValues
	formMethods: UseFormReturn<T>,
	fieldConfigs: FieldConfig<T>[],
) => {
	const controller = useController;
	return fieldConfigs.map(({ name, defaultValue, rules }) => {
		const { field, fieldState } = controller({
			name,
			control: formMethods.control,
			rules,
			defaultValue,
		});
		return { field, fieldState };
	});
};
