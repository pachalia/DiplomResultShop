import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePtoductDto } from '../dto/create-product.dto';
import { Product } from '@prisma/client';
import { SharpService } from 'nestjs-sharp';

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

	async getProducts(): Promise<Product[]> {
		return await this.prisma.product.findMany();
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
