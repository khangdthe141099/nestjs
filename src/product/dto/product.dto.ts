import { IsInt, IsString, Length } from 'class-validator';

//Validate by class-validator:
export class ProductDto {
  @IsString()
  @Length(2, 4, { message: 'error length create', groups: ['create'] })
  @Length(1, 10, { message: 'error length update', groups: ['update'] })
  name: string;
  //Always properties will match all groups:
  @IsString({ always: true })
  desc: string;
  @IsInt({ groups: ['create', 'update'] })
  price: number;
}
