import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityService } from '../service/service/authority.service';
import { AuthorityController } from '../controller/authority.controller';
import { Authority } from '../model/entity/authority.entity';
import {User} from '../model/entity/user.entity';
import {Role} from '../model/entity/role.entity';
import {RoleService} from '../service/service/role.service';
import {UserService} from '../service/service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authority, User, Role]),
  ],
  controllers: [AuthorityController],
  providers: [AuthorityService, RoleService, UserService],
  exports: [],
})
export class AuthorityModule {}
