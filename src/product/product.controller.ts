import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HeadersDto } from './dto/headers.dto';
import { ProductDto } from './dto/product.dto';
import { productSchema, ProductSchemaDto } from './dto/zod.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { RequestHeader } from './pipes/request-header';
import { ZodValidationPipe } from './pipes/zodValidationPipe';

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
    // @RequestHeader(
    //   new ValidationPipe({ whitelist: true, validateCustomDecorators: true })
    // )
    header: HeadersDto
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
