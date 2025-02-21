import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class CartService {
	constructor(private readonly prismaService: PrismaService) {}

	async addToCart(userId: string, productId: string, quantity: number) {
		const cart = await this.prismaService.cart.findFirst({ where: { userId } });
		const cartItem = await this.prismaService.cartItem.findFirst({
			where: { AND: [{ cartId: cart.id }, { productId }] },
		});
		return await this.prismaService.cartItem.upsert({
			where: { id: cartItem ? cartItem.id : '' },
			create: { cartId: cart.id, productId, quantity },
			update: {
				quantity: cartItem ? quantity + cartItem.quantity : quantity,
			},
		});
	}

	async getCartByUser(userId: string) {
		const cart = await this.prismaService.cart.findFirst({ where: { userId } });
		return await this.prismaService.cartItem
			.findMany({
				where: { cartId: cart.id },
				include: { product: true },
			})
			.then((res) =>
				res.map((val) => {
					return {
						id: val.id,
						quantity: val.quantity,
						product_id: val.productId,
						product_name: val.product.name,
						product_description: val.product.description,
						product_price: val.product.price,
						product_stock_quantity: val.product.quantity,
						product_image: val.product.image,
					};
				}),
			);
	}

	async deleteProductToCart(userId: string, id?: string) {
		const cart = await this.prismaService.cart.findFirst({ where: { userId } });
		if (!cart) return null;
		let count: number;
		if (!id) {
			count = await this.prismaService.cartItem
				.deleteMany({ where: { cartId: cart.id } })
				.then((res) => res.count);
		} else {
			count = await this.prismaService.cartItem
				.deleteMany({
					where: {
						AND: [{ cartId: cart.id }, { id }],
					},
				})
				.then((res) => res.count);
		}
		return count > 0;
	}
}
