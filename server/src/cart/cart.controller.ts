import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';

@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Post()
	addProductToCart(@CurrentUser() user: JwtPayload, @Body() dto: AddProductToCartDto) {
		return this.cartService.addToCart(user.id, dto.productId, +dto.quantity);
	}
	@Get()
	getcartByUser(@CurrentUser() user: JwtPayload) {
		return this.cartService.getCartByUser(user.id);
	}

	@Delete()
	clearCart(@CurrentUser() user: JwtPayload) {
		return this.cartService.deleteProductToCart(user.id);
	}

	@Delete(':id')
	deleteProductToCart(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
		return this.cartService.deleteProductToCart(user.id, id);
	}
}
