import { IsInt, IsString, Length } from 'class-validator';

//Validate by class-validator:
export class CreateProductDto {
  @IsString()
  @Length(1, 10, { message: 'error length create', groups: ['create'] })
  @Length(1, 10, { message: 'error length update', groups: ['update'] })
  name: string;
  //Always properties will match all groups:
  @IsString({ always: true })
  description: string;
  @IsInt({ always: true })
  price: number;
}
