export interface PaginationResponse<T> {
	ofset: number;
	limit: number;
	total: number;
	data: T;
}
