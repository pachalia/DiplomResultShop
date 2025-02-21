import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser, Roles } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guargs/role.guard';
import { OrderStatus, Role } from '@prisma/client';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	async createOrder(@Body() body: { id: string }, @CurrentUser() user: JwtPayload) {
		return await this.orderService.createOrder(body.id, user.id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.MANAGER)
	@Put()
	async updateOrderStatus(@Body() body: { id: string; status: OrderStatus }) {
		return await this.orderService.updateOrderStatus(body.id, body.status);
	}

	@Get('current-user')
	async getOrdersByCurrentUser(@CurrentUser() user: JwtPayload) {
		return await this.orderService.getOrdersByCurrentUser(user.id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.MANAGER)
	@Get()
	async getOrders() {
		return await this.orderService.getOrders();
	}

	@Post('order-item')
	async createOrderItem(@Body() dto: CreateOrderItemDto) {
		return await this.orderService.createOrderItem(dto);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.MANAGER)
	@Get('order-item/:id')
	async getOrderItemByOrderId(@Param('id') id: string) {
		return await this.orderService.getOrderItemByOrderId(id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.MANAGER)
	@Delete(':id')
	async deleteOrder(@Param('id') id: string) {
		return await this.orderService.deleteOrder(id);
	}
}
