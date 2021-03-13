import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthStrategy } from './jwt.strategy';
import { UserModule } from '../../module/user.module';
import {config} from '../../config/config.json';
@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'marvin',
      signOptions: {
        expiresIn: config.tokenSetTimeOut,
      },
    }),
    forwardRef(() => UserModule), // 处理循环依赖的关系
  ],
  providers: [AuthService, AuthStrategy],
  // exports: [PassportModule, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
