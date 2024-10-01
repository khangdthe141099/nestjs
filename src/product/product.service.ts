import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AFFECTED } from 'src/const';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDTO } from './dto/pagination.dto';
import { ProductSchemaDto, UpdateProductSchemaDto } from './dto/zod.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  async getAll(paginationDTO: PaginationDTO) {
    const product = await this.productRepo.find({
      skip: paginationDTO.skip,
      take: paginationDTO.limit,
    });

    if (!product) throw new NotFoundException();
    return {
      success: true,
      total: product.length,
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
    return await this.productRepo.update({ id }, dto);
  }

  async delete(id: number) {
    const deleteProduct = await this.productRepo.delete({
      id,
    });

    if (deleteProduct.affected === AFFECTED.ERROR) {
      return {
        success: false,
        message: 'Product not found',
      };
    }
    return {
      success: true,
    };
  }
}
