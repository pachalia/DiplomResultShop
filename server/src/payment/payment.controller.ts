import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
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
	async createRefund(@Body() body: { paymentId; amount }) {
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
}
