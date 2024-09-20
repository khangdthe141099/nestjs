import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSchemaDto, UpdateProductSchemaDto } from './dto/zod.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  async getAll() {
    const product = await this.productRepo.find();

    if (!product) throw new NotFoundException();
    return {
      success: true,
      data: product,
    };
  }

  async getById(id: any) {
    const product = await this.productRepo.findOne({
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException();
    return {
      success: true,
      data: product,
    };
  }

  async create(body: ProductSchemaDto) {
    return await this.productRepo.save(body);
  }

  async update(id: number, dto: UpdateProductSchemaDto) {
    console.log({ dto });
    return await this.productRepo.update({ id }, dto);
  }

  delete() {}
}
