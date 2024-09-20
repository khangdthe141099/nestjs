import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  productSchema,
  ProductSchemaDto,
  updateProductSchema,
  UpdateProductSchemaDto,
} from './dto/zod.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll();
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
  @UsePipes(new ZodValidationPipe(updateProductSchema))
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: UpdateProductSchemaDto
  ) {
    return this.productService.update(id, body);
  }

  @Delete()
  delete(@Param('id', ParseIntPipe) id) {
    this.productService.delete();
  }
}
