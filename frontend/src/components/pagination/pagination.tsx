import { useEffect, useState } from 'react';
import styles from './pagination.module.css';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	load: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	load,
}) => {
	//Set number of pages
	const numberOfPages: number[] = [];
	for (let i = 1; i <= totalPages; i++) {
		numberOfPages.push(i);
	}
	// Array of buttons what we see on the page
	const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

	useEffect(() => {
		let tempNumberOfPages: unknown[] = [...arrOfCurrButtons];
		const dotsInitial = '...';
		const dotsLeft = '...';
		const dotsRight = '...';
		if (numberOfPages.length < 6) {
			tempNumberOfPages = numberOfPages;
		} else if (currentPage >= 1 && currentPage <= 3) {
			tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
		} else if (currentPage === 4) {
			const sliced = numberOfPages.slice(0, 5);
			tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
		} else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {
			// from 5 to 8 -> (10 - 2)
			const sliced1 = numberOfPages.slice(currentPage - 2, currentPage); // sliced1 (5-2, 5) -> [4,5]
			const sliced2 = numberOfPages.slice(currentPage, currentPage + 1); // sliced1 (5, 5+1) -> [6]
			tempNumberOfPages = [
				1,
				dotsLeft,
				...sliced1,
				...sliced2,
				dotsRight,
				numberOfPages.length,
			]; // [1, '...', 4, 5, 6, '...', 10]
		} else if (currentPage > numberOfPages.length - 3) {
			// > 7
			const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice(10-4)
			tempNumberOfPages = [1, dotsLeft, ...sliced];
		} else {
			if (currentPage.toString() === dotsInitial) {
				onPageChange(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
			} else {
				if (currentPage.toString() === dotsRight) {
					onPageChange(arrOfCurrButtons[3] + 2);
				} else {
					if (currentPage.toString() === dotsLeft) {
						onPageChange(arrOfCurrButtons[3] - 2);
					}
				}
			}
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		setArrOfCurrButtons(tempNumberOfPages);
		onPageChange(currentPage);
	}, [currentPage]);
	return (
		<>
			<div style={{ marginBottom: 20 }}>
				<div
					className={`flex items-center justify-center`}
					style={{ marginTop: '40px' }}
				>
					<div>
						<div
							className={`${currentPage === 1 ? styles.disabled : ''} ${styles.prev_next}`}
							onClick={() => {
								load(true);
								onPageChange(currentPage - 1);
							}}
						>
							Пред
						</div>
					</div>

					{arrOfCurrButtons.map((val, index: number) => {
						return val !== '...' ? (
							<div key={index}>
								<div
									className={`${currentPage === val ? styles.active : styles.pagination}`}
									onClick={() => {
										load(true);
										onPageChange(val);
									}}
									style={{ marginLeft: index === 0 ? 25 : 0 }}
								>
									{val}
								</div>
							</div>
						) : (
							<div className={styles.dot_style}>{val}</div>
						);
					})}
					<div>
						<div
							className={`${currentPage === totalPages ? styles.disabled : ''} ${styles.prev_next}`}
							onClick={() => {
								load(true);
								onPageChange(currentPage + 1);
							}}
						>
							След
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
