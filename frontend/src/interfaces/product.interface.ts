export interface IProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	image: string | null;
	category_id: string;
}
