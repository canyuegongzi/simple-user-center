import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserController } from '../controller/user.controller';
import { AuthModule } from '../common/auth/auth.module';
import { User } from '../model/entity/user.entity';
import { UserService } from '../service/service/user.service';
import {Role} from '../model/entity/role.entity';
import {RedisModule} from 'nestjs-redis';
import {redisConfig} from '../config/config';
import {AuthService} from '../common/auth/auth.service';

@Module({
  imports: [
    // RedisModule.register(redisConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => AuthModule),   // 处理模块间的循环依赖
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
