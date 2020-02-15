import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../model/entity/role.entity';
import {Authority} from '../model/entity/authority.entity';
import {User} from '../model/entity/user.entity';
import {ConfigService} from '../service/service/config.service';
import {ConfigController} from '../controller/config.controller';
import {PassportModule} from '@nestjs/passport';
import {AuthModule} from '../common/auth/auth.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => AuthModule),   // 处理模块间的循环依赖
        TypeOrmModule.forFeature([Role, Authority, User]),
    ],
    controllers: [ConfigController],
    providers: [ConfigService],
    exports: [],
})
export class ConfigModule {}
