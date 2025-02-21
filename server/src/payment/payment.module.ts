import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';
import { GUARDS } from '@auth/guargs';

@Module({
	controllers: [PaymentController],
	providers: [PaymentService, ConfigService, ...GUARDS],
	exports: [PaymentService],
})
export class PaymentModule {}
