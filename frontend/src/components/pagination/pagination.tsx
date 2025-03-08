import { useEffect, useState } from 'react';
import styles from './pagination.module.css';

interface PaginationProps {
	totalPages: number;
	pagination: { currentPage: number; loading: boolean };
	setPagination: React.Dispatch<
		React.SetStateAction<{ currentPage: number; loading: boolean }>
	>;
}
export const Pagination: React.FC<PaginationProps> = ({
	totalPages,
	setPagination,
	pagination,
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
		} else if (pagination.currentPage >= 1 && pagination.currentPage <= 3) {
			tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
		} else if (pagination.currentPage === 4) {
			const sliced = numberOfPages.slice(0, 5);
			tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
		} else if (
			pagination.currentPage > 4 &&
			pagination.currentPage < numberOfPages.length - 2
		) {
			// from 5 to 8 -> (10 - 2)
			const sliced1 = numberOfPages.slice(
				pagination.currentPage - 2,
				pagination.currentPage,
			); // sliced1 (5-2, 5) -> [4,5]
			const sliced2 = numberOfPages.slice(
				pagination.currentPage,
				pagination.currentPage + 1,
			); // sliced1 (5, 5+1) -> [6]
			tempNumberOfPages = [
				1,
				dotsLeft,
				...sliced1,
				...sliced2,
				dotsRight,
				numberOfPages.length,
			]; // [1, '...', 4, 5, 6, '...', 10]
		} else if (pagination.currentPage > numberOfPages.length - 3) {
			// > 7
			const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice(10-4)
			tempNumberOfPages = [1, dotsLeft, ...sliced];
		} else {
			if (pagination.currentPage.toString() === dotsInitial) {
				const num = arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1;
				setPagination({ ...pagination, currentPage: num });
			} else {
				if (pagination.currentPage.toString() === dotsRight) {
					const num = arrOfCurrButtons[3] + 2;
					setPagination({ ...pagination, currentPage: num });
				} else {
					if (pagination.currentPage.toString() === dotsLeft) {
						const num = arrOfCurrButtons[3] - 2;
						setPagination({ ...pagination, currentPage: num });
					}
				}
			}
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		setArrOfCurrButtons(tempNumberOfPages);
		setPagination({ ...pagination, currentPage: pagination.currentPage });
	}, [pagination.currentPage]);
	return (
		<>
			<div style={{ marginBottom: 20 }}>
				<div
					className={`flex items-center justify-center`}
					style={{ marginTop: '40px' }}
				>
					<div>
						<div
							className={`${pagination.currentPage === 1 ? styles.disabled : ''} ${styles.prev_next}`}
							onClick={() => {
								setPagination({
									loading: true,
									currentPage: pagination.currentPage - 1,
								});
							}}
						>
							Пред
						</div>
					</div>

					{arrOfCurrButtons.map((val, index: number) => {
						return val !== '...' ? (
							<div key={index}>
								<div
									className={`${pagination.currentPage === val ? styles.active : styles.pagination}`}
									onClick={() => {
										setPagination({
											loading: true,
											currentPage: val,
										});
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
							className={`${pagination.currentPage === totalPages ? styles.disabled : ''} ${styles.prev_next}`}
							onClick={() => {
								setPagination({
									loading: true,
									currentPage: pagination.currentPage + 1,
								});
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
