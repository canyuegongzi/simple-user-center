import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../model/entity/role.entity';
import { RoleController } from '../controller/role.controller';
import { RoleService } from '../service/service/role.service';
import {Authority} from '../model/entity/authority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Authority]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [],
})
export class RoleModule {}
