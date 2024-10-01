import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

//Validate by class-validator:
export class PaginationDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  skip: number;
  //Always properties will match all groups:
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit: number;
}
