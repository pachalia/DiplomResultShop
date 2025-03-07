import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UnsupportedMediaTypeException,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreatePtoductDto } from '../dto/create-product.dto';
import { Public } from '@common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { Product } from '@prisma/client';
import { CategoryPaginationDto } from '../shared/category-pagination.dto';

@Public()
@Controller('products')
export class ProductsController {
	constructor(private readonly productService: ProductsService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	createProduct(
		@Body() createProduct: CreatePtoductDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		if (!file) return this.productService.createProduct(createProduct);
		if (file && file.mimetype.includes('image/'))
			return this.productService.createProduct(createProduct, file);
		throw new UnsupportedMediaTypeException();
	}

	@Get()
	async getProducts(@Query() productPaginationDto: CategoryPaginationDto) {
		const productPagination = plainToInstance(
			CategoryPaginationDto,
			productPaginationDto,
		);
		const [data, total] = await this.productService.getProducts(productPagination);
		return { ...productPagination, data, total };
	}

	@Put()
	updateProduct(@Body() product: Partial<Product>) {
		return this.productService.updateProduct(product);
	}

	@Get('find')
	findProducts(@Body() body: { product: string }) {
		return this.productService.findProducts(body.product);
	}

	@Get(':id')
	getProductById(@Param('id') id: string) {
		return this.productService.getProductById(id);
	}
	@Delete(':id')
	deleteProducts(@Param('id') id: string) {
		return this.productService.deleteProduct(id);
	}
	@Get('categories/:id')
	getProductsByCategories(@Param('id') id: string) {
		return this.productService.getProductsByCategory(id);
	}
}
