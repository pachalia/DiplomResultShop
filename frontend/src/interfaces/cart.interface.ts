export interface ICart {
	id: string;
	quantity: number;
	product_id: string;
	product_name: string;
	product_description: string;
	product_price: number;
	product_stock_quantity: number;
	product_image: string | null;
}
