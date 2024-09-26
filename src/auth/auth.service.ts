import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordMatch = await bcrypt.compare(password, user.data.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid credentials');

    return { id: user.data.id };
  }

  login(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
