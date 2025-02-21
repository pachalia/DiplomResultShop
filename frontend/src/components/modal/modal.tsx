import React from 'react';

interface ModalProps<T> {
	message: string;
	callback: () => void;
	setModal: React.Dispatch<React.SetStateAction<T | null>>;
}

// Указываем тип T, например, как unknown
export const Modal = <T,>({ message, callback, setModal }: ModalProps<T>) => {
	return (
		<div
			id="popup-modal"
			className="overflow-y-auto overflow-x-hidden fixed top-1/3 right-0 left-1/4 z-50 justify-center items-center w-full max-h-full"
		>
			<div className="relative p-4 w-full max-w-md max-h-full">
				<div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
					<div className="p-4 md:p-5 text-center">
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							{message}
						</h3>
						<button
							onClick={() => {
								callback();
								setModal(null);
							}}
							data-modal-hide="popup-modal"
							type="button"
							className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
						>
							OK
						</button>
						<button
							onClick={() => setModal(null)}
							data-modal-hide="popup-modal"
							type="button"
							className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
						>
							Отмена
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
