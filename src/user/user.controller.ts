import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PaginationSchemaDTO } from 'src/product/dto/pagination.dto';
import { ZodValidationPipe } from 'src/product/pipes/zodValidationPipe';
import {
  createUserSchema,
  CreateUserSchemaDTO,
  UpdateUserSchemaDTO,
} from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserSchemaDTO) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationSchemaDTO) {
    return this.userService.findAll(paginationDTO);
  }

  //Authorization JWT:
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserSchemaDTO) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
