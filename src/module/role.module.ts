import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../model/entity/role.entity';
import { RoleController } from '../controller/role.controller';
import { RoleService } from '../service/service/role.service';
import {Authority} from '../model/entity/authority.entity';
import {System} from '../model/entity/system.entity';
import {ApiResource} from '../model/entity/apiResource.entity';
import {RoleApiResourceEntity} from '../model/entity/roleApiResource.entity';
import {UserService} from '../service/service/user.service';
import {User} from '../model/entity/user.entity';
import {RedisCacheService} from '../service/service/redisCache.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Authority, System, User, ApiResource, RoleApiResourceEntity]),
  ],
  controllers: [RoleController],
  providers: [RoleService, UserService, RedisCacheService],
  exports: [],
})
export class RoleModule {}
