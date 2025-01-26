export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number | null;
	image: string | null;
	category_id: string;
}
