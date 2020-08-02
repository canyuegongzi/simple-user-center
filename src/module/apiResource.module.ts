import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {System} from '../model/entity/system.entity';
import {ApiResource} from '../model/entity/apiResource.entity';
import {RoleApiResourceEntity} from '../model/entity/roleApiResource.entity';
import {SystemService} from '../service/service/system.service';
import {RedisCacheService} from '../service/service/redisCache.service';
import {ApiResourceService} from '../service/service/apiResource.service';
import {ApiResourceController} from '../controller/apiResource.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([System, ApiResource, RoleApiResourceEntity]),
    ],
    controllers: [ApiResourceController],
    providers: [SystemService, RedisCacheService, ApiResourceService],
    exports: [],
})
export class ApiResourceModule {}
