import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

//Validate by class-validator:
export class LoginDto {
  @ApiProperty()
  @IsString({ message: 'email la string', always: true })
  email: string;
  @ApiProperty()
  @IsString({ message: 'password la string', always: true })
  password: string;
}
