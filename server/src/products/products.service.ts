import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePtoductDto } from '../dto/create-product.dto';
import { Product } from '@prisma/client';
import { SharpService } from 'nestjs-sharp';
import { PaginationDto } from '../shared/pagination.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly sharpService: SharpService,
	) {}

	async createProduct(
		product: CreatePtoductDto,
		image?: Express.Multer.File,
	): Promise<Product> {
		const category = await this.prisma.category.findFirst({
			where: { name: product.category },
		});
		if (!category) {
			return null;
		} else {
			return await this.prisma.product.create({
				data: {
					name: product.name,
					description: product.description,
					image: image ? await this.imageToBase64(image.buffer) : null,
					price: +product.price,
					category_id: product.category,
				},
			});
		}
	}

	async getProducts(productPagination: PaginationDto): Promise<[Product[], number]> {
		const {
			category,
			order,
			offset: skip,
			limit: take,
		} = plainToInstance(PaginationDto, productPagination);
		let products = [];
		let count: number = 0;
		if (!category) {
			count = await this.prisma.product.count();
			products = await this.prisma.product.findMany({
				skip,
				take,
				orderBy: order ? { price: order } : undefined,
			});
			return [products, count];
		}
		if (order && order !== 'asc' && order !== 'desc') {
			console.log(1);
			throw new BadRequestException(
				`Нужно указать 'asc' или 'desc'. У вас указан '${order}'`,
			);
		}
		const _category = await this.prisma.category.findFirst({
			where: { name: category },
		});
		if (!_category) throw new NotFoundException('Категория не найдена');
		count = await this.prisma.product.count({ where: { category_id: category } });
		products = await this.prisma.product.findMany({
			where: { category_id: category },
			skip,
			take,
			orderBy: order ? { price: order } : undefined,
		});
		return [products, count];
	}

	async updateProduct(product: Partial<Product>) {
		if (!product.id) {
			throw new BadRequestException('Не передан id');
		}
		const _product = await this.prisma.product.findFirst({
			where: { id: product.id },
		});
		if (!_product) {
			throw new BadRequestException(`Продукт с ${product.id} не найден в базе`);
		}
		return this.prisma.product.update({
			where: { id: product.id },
			data: {
				price: product.price ?? undefined,
				name: product.name ?? undefined,
				quantity: product.quantity ?? undefined,
			},
		});
	}
	async getProductById(id: string): Promise<Product> {
		return await this.prisma.product.findFirst({ where: { id } });
	}

	async getProductsByCategory(categoryId: string) {
		return await this.prisma.product.findMany({ where: { category_id: categoryId } });
	}
	async imageToBase64(buffer: Buffer): Promise<string> {
		return await new Promise((resolve, reject) => {
			this.sharpService
				.edit(buffer, { failOnError: false })
				.rotate(null)
				.webp({ quality: 100 })
				.resize(150, 150, { fit: 'inside' })
				.toBuffer((err, data) => {
					if (err) {
						reject(err);
					}
					resolve(`data:image/webp;base64,${data.toString('base64')}`);
				});
		});
	}
}
