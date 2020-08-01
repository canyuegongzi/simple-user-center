import {Injectable, Inject, Body, Query} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {System} from '../../model/entity/system.entity';
import {ApiResource} from '../../model/entity/apiResource.entity';
import {RoleApiResourceEntity} from '../../model/entity/roleApiResource.entity';
import {RedisCacheService} from './redisCache.service';
import {CreateApiResourceDto} from '../../model/DTO/apiResource/create_apiResource.dto';
import {MessageType, ResultData} from '../../common/result/ResultData';
import {UpdateApiResourceDto} from '../../model/DTO/apiResource/update_apiResource.dto';
import {QueryApiResourceDto} from '../../model/DTO/apiResource/query_apiResource.dto';
import {DeleteApiResourceDto} from '../../model/DTO/apiResource/delete_apiResource.dto';

@Injectable()
export class ApiResourceService {
    constructor(
        @InjectRepository(System) private readonly systemRepository: Repository<System>,
        @InjectRepository(ApiResource) private readonly apiResourceRepository: Repository<ApiResource>,
        @InjectRepository(RoleApiResourceEntity) private readonly roleApiResourceEntityRepository: Repository<RoleApiResourceEntity>,
        @Inject(RedisCacheService) private readonly redisCacheService: RedisCacheService,
    ) {
    }

    /**
     * 添加api资源
     * @param params
     */
    public async createApiResource(params: CreateApiResourceDto): Promise<ResultData> {
        return new ResultData(MessageType.CREATE, null);
    }

    /**
     * 更新api资源
     * @param params
     */
    public async updateApiResource(params: UpdateApiResourceDto): Promise<ResultData> {
        return new ResultData(MessageType.UPDATE, null);
    }

    /**
     * 获取api列表
     * @param params
     */
    public async getApiList(params: QueryApiResourceDto): Promise<ResultData> {
        return new ResultData(MessageType.GETLIST, null);
    }

    /**
     * 获取系统列表
     */
    public async getSystemList(): Promise<ResultData> {
        return new ResultData(MessageType.GETLIST, null);
    }

    /**
     * 通过系统获取模块
     * @param system
     */
    public async getModuleBySystem(system: string): Promise<ResultData> {
        return new ResultData(MessageType.GETLIST, null);
    }

    /**
     * 删除资源
     * @param params
     */
    public async deleteResource(params: DeleteApiResourceDto): Promise<ResultData> {
        return new ResultData(MessageType.DELETE, null);
    }

    /**
     * 系统资源唯一性
     * @param system
     */
    public async uniqueSystemCode(system: string): Promise<boolean> {
        return true;
    }

    /**
     * 模块资源唯一性
     * @param system
     * @param module
     */
    public async  uniqueModuleCode(system: string, @Body('moduleCode') module: string): Promise<boolean> {
        return true;
    }

    /**
     * api唯一性
     * @param system
     */
    public async uniqueApiCode(system: string): Promise<boolean> {
        return true;
    }
}
