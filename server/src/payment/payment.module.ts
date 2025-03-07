import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';
import { GUARDS } from '@auth/guargs';
import { PrismaService } from '@prisma/prisma.service';

@Module({
	controllers: [PaymentController],
	providers: [PaymentService, ConfigService, ...GUARDS, PrismaService],
	exports: [PaymentService],
})
export class PaymentModule {}
