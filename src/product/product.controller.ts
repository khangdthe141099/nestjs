import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { productSchema, ProductSchemaDto, UpdateProductSchemaDto } from './dto/zod.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { ProductService } from './product.service';
import { PaginationSchemaDTO } from './dto/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(@Query() paginationDTO: PaginationSchemaDTO) {
    return this.productService.getAll(paginationDTO);
  }

  @Get(':id')
  getById(@Param('id') id: any) {
    return this.productService.getById(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(productSchema))
  create(
    @Body()
    body: ProductSchemaDto
  ) {
    return this.productService.create(body);
  }

  @Patch(':id')
  // @UsePipes(new ZodValidationPipe(updateProductSchema))
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: UpdateProductSchemaDto
  ) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    this.productService.delete(id);
  }
}
