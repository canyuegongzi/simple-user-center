import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {System} from '../model/entity/SystemEntity';
import {ApiResource} from '../model/entity/ApiResourceEntity';
import {RoleApiResourceEntity} from '../model/entity/RoleApiResourceEntity';
import {SystemService} from '../service/SystemService';
import {RedisCacheService} from '../service/RedisCacheService';
import {ApiResourceService} from '../service/ApiResourceService';
import {ApiResourceController} from '../controller/ApiResourceController';

@Module({
    imports: [
        TypeOrmModule.forFeature([System, ApiResource, RoleApiResourceEntity]),
    ],
    controllers: [ApiResourceController],
    providers: [SystemService, RedisCacheService, ApiResourceService],
    exports: [],
})
export class ApiResourceModule {}
