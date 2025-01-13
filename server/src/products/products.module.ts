import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { SharpModule } from 'nestjs-sharp';

@Module({
	imports: [SharpModule],
	controllers: [ProductsController],
	providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
