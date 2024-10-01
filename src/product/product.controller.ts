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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(@Query() paginationDTO: PaginationDTO) {
    return this.productService.getAll(paginationDTO);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.productService.getById(id);
  }

  @Post()
  // @UsePipes(new ZodValidationPipe(productSchema))
  create(
    @Body()
    body: CreateProductDto
  ) {
    return this.productService.create(body);
  }

  @Patch(':id')
  // @UsePipes(new ZodValidationPipe(updateProductSchema))
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body()
    body: UpdateProductDto
  ) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.productService.delete(id);
  }
}
