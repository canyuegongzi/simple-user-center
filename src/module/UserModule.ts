import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserController } from '../controller/UserController';
import { AuthModule } from '../common/auth/AuthModule';
import { User } from '../model/entity/UserEntity';
import { UserService } from '../service/UserService';
import {Role} from '../model/entity/RoleEntity';
import {RedisCacheService} from '../service/RedisCacheService';

@Module({
  imports: [
    // RedisModule.register(redisConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => AuthModule),   // 处理模块间的循环依赖
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [UserController],
  providers: [ RedisCacheService, UserService],
  exports: [UserService],
})
export class UserModule {}
