import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../model/entity/RoleEntity';
import { Authority } from '../model/entity/AuthorityEntity';
import { User } from '../model/entity/UserEntity';
import { ConfigService } from '../service/ConfigService';
import { ConfigController } from '../controller/ConfigController';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../common/auth/AuthModule';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => AuthModule),   // 处理模块间的循环依赖
        TypeOrmModule.forFeature([ Role, Authority, User ]),
    ],
    controllers: [ ConfigController ],
    providers: [ ConfigService ],
    exports: [],
})
export class ConfigModule {}
