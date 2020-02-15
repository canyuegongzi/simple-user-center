import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from '../controller/organization.controller';
import { Organization } from '../model/entity/organization.entity';
import { OrganizationService } from '../service/service/organization.service';
import {User} from '../model/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, User]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [],
})
export class OrganizationModule {}
