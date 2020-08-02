import { Body, Controller, Get, Inject, Post, Query, UseInterceptors } from '@nestjs/common';
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
    @Post('resource/add')
    public async createApiResource(@Body() params: CreateApiResourceDto): Promise<ResultData> {
        try {
            await this.apiResourceService.createApiResource(params);
            return new ResultData(MessageType.CREATE, null, true);
        } catch (e) {
            console.log(e)
            return new ResultData(MessageType.CREATE, null, false);
        }
    }

    /**
     * 更新api资源
     * @param params
     */
    @Post('resource/update')
    public async updateApiResource(@Body() params: UpdateApiResourceDto): Promise<ResultData> {
        try {
            await this.apiResourceService.updateApiResource(params);
            return new ResultData(MessageType.UPDATE, null, true);
        } catch (e) {
            return new ResultData(MessageType.UPDATE, null, false);
        }

    }

    /**
     * 获取api列表
     * @param params
     */
    @Get('resource/list')
    public async getApiList(@Query() params: QueryApiResourceDto): Promise<ResultData> {
        try {
            const res = await this.apiResourceService.getApiList(params);
            return new ResultData(MessageType.GETLIST,  {data: res[0], count: res[1]}, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, {data: [], count: 0}, false);
        }

    }

    /**
     * 获取系统列表
     */
    @Get('system/list')
    public async getSystemList(@Query('name') name: string): Promise<ResultData> {
        try {
            const res = await this.apiResourceService.getSystemList(name);
            return new ResultData(MessageType.GETLIST,  {data: res[0], count: res[1]}, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, {data: [], count: 0}, false);
        }
    }

    /**
     * 通过系统获取模块
     * @param system
     */
    @Get('module/list')
    public async getModuleBySystem(@Query('system') system: string): Promise<ResultData> {
        try {
            const res = await this.apiResourceService.getModuleBySystem(system);
            return new ResultData(MessageType.GETLIST,  {data: res[0], count: res[1]}, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, {data: [], count: 0}, false);
        }
    }

    /**
     * 删除资源
     * @param params
     */
    @Post('resource/delete')
    public async deleteResource(@Body() params: DeleteApiResourceDto): Promise<ResultData> {
        try {
            await this.apiResourceService.deleteResource(params);
            return new ResultData(MessageType.DELETE,  true);
        } catch (e) {
            console.log(e)
            return new ResultData(MessageType.DELETE,  false);
        }
    }

    /**
     * 系统资源唯一性
     * @param system
     */
    @Post('system/unique')
    public async uniqueSystemCode(@Body('systemCode') system: string): Promise<boolean> {
        try {
            return  await this.apiResourceService.uniqueSystemCode(system);
        } catch (e) {
            return false;
        }
    }

    /**
     * 模块资源唯一性
     * @param system
     * @param module
     */
    @Post('module/unique')
    public async uniqueModuleCode(@Body('systemCode') system: string, @Body('moduleCode') module: string): Promise<boolean> {
        try {
            return  await this.apiResourceService.uniqueModuleCode(system);
        } catch (e) {
            return false;
        }
    }

    /**
     * api唯一性
     * @param system
     */
    @Post('api/unique')
    public async uniqueApiCode(@Body('apiCode') system: string): Promise<boolean> {
        try {
            return await this.apiResourceService.uniqueApiCode(system);
        } catch (e) {
            return false;
        }
    }
}
