import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityService } from '../service/service/authority.service';
import { AuthorityController } from '../controller/authority.controller';
import { Authority } from '../model/entity/authority.entity';
import {User} from '../model/entity/user.entity';
import {Role} from '../model/entity/role.entity';
import {RoleService} from '../service/service/role.service';
import {UserService} from '../service/service/user.service';
import {RedisCacheService} from '../service/service/redisCache.service';
import {RoleApiResourceEntity} from '../model/entity/roleApiResource.entity';
import {ApiResource} from '../model/entity/apiResource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authority, User, Role, RoleApiResourceEntity, ApiResource]),
  ],
  controllers: [AuthorityController],
  providers: [AuthorityService, RoleService, UserService, RedisCacheService],
  exports: [],
})
export class AuthorityModule {}
