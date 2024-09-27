import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSchemaDTO, UpdateUserSchemaDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationSchemaDTO } from 'src/product/dto/pagination.dto';
import { AFFECTED } from 'src/const';

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

  async findAll(paginationDTO: PaginationSchemaDTO) {
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
      // select: ['firstName', 'lastName', 'avatarUrl'],
    });

    if (!user) throw new NotFoundException();
    return {
      success: true,
      data: user,
    };
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException();
    return {
      success: true,
      data: user,
    };
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
