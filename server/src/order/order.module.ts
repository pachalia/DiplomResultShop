import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from '@prisma/prisma.service';
import { GUARDS } from '@auth/guargs';
import { PaymentService } from '../payment/payment.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService, PrismaService, ...GUARDS, PaymentService],
})
export class OrderModule {}
