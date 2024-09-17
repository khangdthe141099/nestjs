import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { productSchema, ProductSchemaDto } from './dto/zod.dto';

@Controller('product')
export class ProductController {
  @Get()
  getALl() {
    return 'product';
  }

  //Validator parameters and query:
  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean
  ) {
    return {
      id,
      sort,
    };
  }

  //Validator body:
  @Post()
  @UsePipes(new ZodValidationPipe(productSchema))
  create(
    @Body()
    body: ProductSchemaDto,
    @Headers() header
  ) {
    return {
      body,
      header,
    };
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body(
      new ValidationPipe({
        groups: ['update'],
      })
    )
    body: ProductDto
  ) {
    return body;
  }
}
