import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSchemaDTO, UpdateUserSchemaDTO } from './schema/create-user.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AFFECTED } from 'src/const';
import { PaginationDTO } from 'src/product/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }

  async create(createUserDto: CreateUserSchemaDTO) {
    const user = this.userRepo.create(createUserDto); //hash password by userDTO
    return await this.userRepo.save(user); //Save user with password hash into the database
  }

  async findAll(paginationDTO: PaginationDTO) {
    const user = await this.userRepo.find({
      skip: paginationDTO.skip,
      take: paginationDTO.limit,
    });

    if (!user) throw new NotFoundException();
    return {
      success: true,
      total: user.length,
      data: user,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException();
    return {
      success: true,
      data: user,
    };
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserSchemaDTO) {
    return await this.userRepo.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    const deleteUser = await this.userRepo.delete({
      id,
    });

    if (deleteUser.affected === AFFECTED.ERROR) {
      return {
        success: false,
        message: 'Product not found',
      };
    }
    return {
      success: true,
    };
  }
}
