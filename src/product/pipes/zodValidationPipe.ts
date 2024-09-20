import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const parseValue = this.schema.safeParse(value);
    console.log('testtt', parseValue);
    if (parseValue.success) {
      console.log('runnn');
      return parseValue.data;
    }
    throw new BadRequestException({
      success: false,
      data: null,
      message: parseValue.error,
    });
  }
}
