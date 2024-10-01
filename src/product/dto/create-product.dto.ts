import { IsInt, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//Validate by class-validator:
export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @Length(1, 10, { message: 'error length create', groups: ['create'] })
  @Length(1, 10, { message: 'error length update', groups: ['update'] })
  name: string;
  //Always properties will match all groups:
  @ApiProperty()
  @IsString({ always: true })
  description: string;

  @ApiProperty()
  @IsInt({ always: true })
  price: number;
}
