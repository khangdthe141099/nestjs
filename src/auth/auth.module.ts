import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import googleOauthConfig from 'src/config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'local' }), //Authentication by passport
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AuthModule {}
