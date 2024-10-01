import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

//Validate by class-validator:
export class LoginDto {
  @ApiProperty()
  @IsString()
  email: string;
  //Always properties will match all groups:
  @ApiProperty()
  @IsString()
  password: string;
}
