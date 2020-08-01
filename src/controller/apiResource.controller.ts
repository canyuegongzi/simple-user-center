import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/transform.interceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/logging.interceptor';
import {SystemService} from '../service/service/system.service';
import {ApiResourceService} from '../service/service/apiResource.service';
import {CreateApiResourceDto} from '../model/DTO/apiResource/create_apiResource.dto';
import {UpdateApiResourceDto} from '../model/DTO/apiResource/update_apiResource.dto';
import {QueryApiResourceDto} from '../model/DTO/apiResource/query_apiResource.dto';
import {DeleteApiResourceDto} from '../model/DTO/apiResource/delete_apiResource.dto';
import {MessageType, ResultData} from '../common/result/ResultData';

@Controller('apiResource')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class ApiResourceController {
    constructor(
        @Inject(SystemService) private readonly systemService: SystemService,
        @Inject(ApiResourceService) private readonly apiResourceService: ApiResourceService,
    ) {
    }

    /**
     * 添加api资源
     * @param params
     */
    public async createApiResource(@Body() params: CreateApiResourceDto): Promise<ResultData> {
        return new ResultData(MessageType.CREATE, null);
    }

    /**
     * 更新api资源
     * @param params
     */
    public async updateApiResource(@Body() params: UpdateApiResourceDto): Promise<ResultData> {
        return new ResultData(MessageType.UPDATE, null);
    }

    /**
     * 获取api列表
     * @param params
     */
    public async getApiList(@Query() params: QueryApiResourceDto): Promise<ResultData> {
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
    public async getModuleBySystem(@Query('system') system: string): Promise<ResultData> {
        return new ResultData(MessageType.GETLIST, null);
    }

    /**
     * 删除资源
     * @param params
     */
    public async deleteResource(@Body() params: DeleteApiResourceDto): Promise<ResultData> {
        return new ResultData(MessageType.DELETE, null);
    }

    /**
     * 系统资源唯一性
     * @param system
     */
    public async uniqueSystemCode(@Body('systemCode') system: string): Promise<boolean> {
        return true;
    }

    /**
     * 模块资源唯一性
     * @param system
     * @param module
     */
    public async  uniqueModuleCode(@Body('systemCode') system: string, @Body('moduleCode') module: string): Promise<boolean> {
        return true;
    }

    /**
     * api唯一性
     * @param system
     */
    public async uniqueApiCode(@Body('apiCode') system: string): Promise<boolean> {
        return true;
    }
}
