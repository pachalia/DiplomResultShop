import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UnsupportedMediaTypeException,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreatePtoductDto } from '../dto/create-product.dto';
import { Public } from '@common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

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
	getProducts() {
		return this.productService.getProducts();
	}
	@Get(':id')
	getProductById(@Param('id') id: string) {
		return this.productService.getProductById(id);
	}
	@Get('categories/:id')
	getProductsByCategories(@Param('id') id: string) {
		return this.productService.getProductsByCategory(id);
	}
}
