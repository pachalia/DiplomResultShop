import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { RolesGuard } from '@auth/guargs/role.guard';
import { Role } from '@prisma/client';
import { Roles } from '@common/decorators';

@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post()
	async createPayment(@Body() body: { value: string }) {
		return await this.paymentService.createPayment(body.value);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.MANAGER)
	@Post('refund')
	async createRefund(@Body() body: { paymentId: string; amount: string }) {
		return await this.paymentService.refund(body.paymentId, body.amount);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.MANAGER)
	@Put()
	async capturePayment(@Body() body: { paymentId: string; amount?: string }) {
		return body.amount
			? await this.paymentService.capturePayment(body.paymentId, body.amount)
			: await this.paymentService.capturePayment(body.paymentId);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.MANAGER)
	@Get(':id')
	async getPaymentById(@Param('id') id: string) {
		return await this.paymentService.getPayment(id);
	}
}
