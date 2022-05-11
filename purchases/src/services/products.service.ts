import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return await this.prisma.product.findMany();
  }

  async createProduct(data: CreateProductParams) {
    const slug = slugify(data.title, { lower: true });

    const findProductWithSameSlug = await this.prisma.product.findFirst({
      where: {
        slug: slug,
      },
    });

    if (findProductWithSameSlug) {
      throw new Error('Another product with same slug already exists');
    }

    return await this.prisma.product.create({
      data: {
        slug,
        title: data.title,
      },
    });
  }
}
