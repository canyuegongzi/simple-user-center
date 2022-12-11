import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from '../controller/OrganizationController';
import { Organization } from '../model/entity/OrganizationEntity';
import { OrganizationService } from '../service/OrganizationService';
import { User } from '../model/entity/UserEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Organization, User ]),
  ],
  controllers: [ OrganizationController ],
  providers: [ OrganizationService ],
  exports: [],
})
export class OrganizationModule {}
