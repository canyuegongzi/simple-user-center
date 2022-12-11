import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../model/entity/RoleEntity';
import { RoleController } from '../controller/RoleController';
import { RoleService } from '../service/RoleService';
import { Authority } from '../model/entity/AuthorityEntity';
import { System } from '../model/entity/SystemEntity';
import { ApiResource } from '../model/entity/ApiResourceEntity';
import { RoleApiResourceEntity } from '../model/entity/RoleApiResourceEntity';
import { UserService } from '../service/UserService';
import { User } from '../model/entity/UserEntity';
import { RedisCacheService } from '../service/RedisCacheService';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Role, Authority, System, User, ApiResource, RoleApiResourceEntity ]),
  ],
  controllers: [ RoleController ],
  providers: [ RoleService, UserService, RedisCacheService ],
  exports: [],
})
export class RoleModule {}
