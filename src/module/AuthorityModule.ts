import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityService } from '../service/AuthorityService';
import { AuthorityController } from '../controller/AuthorityController';
import { Authority } from '../model/entity/AuthorityEntity';
import { User } from '../model/entity/UserEntity';
import { Role } from '../model/entity/RoleEntity';
import { RoleService } from '../service/RoleService';
import { UserService } from '../service/UserService';
import { RedisCacheService } from '../service/RedisCacheService';
import { RoleApiResourceEntity } from '../model/entity/RoleApiResourceEntity';
import { ApiResource } from '../model/entity/ApiResourceEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Authority, User, Role, RoleApiResourceEntity, ApiResource ]),
  ],
  controllers: [ AuthorityController ],
  providers: [ AuthorityService, RoleService, UserService, RedisCacheService ],
  exports: [],
})
export class AuthorityModule {}
