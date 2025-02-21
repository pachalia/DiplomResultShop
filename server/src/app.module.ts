import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@auth/guargs/jwt-auth.guard';
import { CartModule } from './cart/cart.module';
import { AuthMiddleware } from '@auth/middlewares/auth.middleware';
import { AddressModule } from './address/address.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CategoriesModule,
		ProductsModule,
		UserModule,
		AuthModule,
		CartModule,
		AddressModule,
		PaymentModule,
		OrderModule,
	],
	controllers: [AppController],
	providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthMiddleware).forRoutes('/');
	}
}
