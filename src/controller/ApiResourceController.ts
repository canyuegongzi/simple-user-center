import { Body, Controller, Get, Inject, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/TransformInterceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/LoggingInterceptor';
import { SystemService } from '../service/SystemService';
import { ApiResourceService } from '../service/ApiResourceService';
import { CreateApiResourceDto } from '../model/DTO/apiResource/CreateApiResourceDto';
import { UpdateApiResourceDto } from '../model/DTO/apiResource/UpdateApiResourceDto';
import { QueryApiResourceDto } from '../model/DTO/apiResource/QueryApiResourceDto';
import { DeleteApiResourceDto } from '../model/DTO/apiResource/DeleteApiResourceDto';
import { MessageType, ResultData } from '../common/result/ResultData';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

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
            return new ResultData(MessageType.GETLIST, { data: res[0], count: res[1] }, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, { data: [], count: 0 }, false);
        }

    }

    /**
     * 获取系统列表
     */
    @Get('system/list')
    public async getSystemList(@Query('name') name: string): Promise<ResultData> {
        try {
            const res = await this.apiResourceService.getSystemList(name);
            return new ResultData(MessageType.GETLIST, { data: res[0], count: res[1] }, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, { data: [], count: 0 }, false);
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
            return new ResultData(MessageType.GETLIST, { data: res[0], count: res[1] }, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, { data: [], count: 0 }, false);
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
            return new ResultData(MessageType.DELETE, null, true);
        } catch (e) {
            return new ResultData(MessageType.DELETE, null, false);
        }
    }

    /**
     * 系统资源唯一性
     * @param system
     */
    @Post('system/unique')
    public async uniqueSystemCode(@Body('systemCode') system: string): Promise<boolean> {
        try {
            return await this.apiResourceService.uniqueSystemCode(system);
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

    /**
     * 下载模板
     * @param res
     */
    @Get('template/download')
    public async downloadExcel(@Res() res: any): Promise<any> {
        try {
            const filePath = join(__dirname, './apiResourceTemplate.xlsx');
            if (!existsSync(filePath)) {
                await this.createExcel();
            }
            res.type('application/vnd.openxmlformats');
            res.attachment('接口资源导入模板.xlsx');
            res.send(readFileSync(filePath));
        } catch (e) {
            return new ResultData(MessageType.FILEERROR, false);
        }

    }

    /**
     * 资源数据导入
     * @param res
     */
    @Post('template/import')
    @UseInterceptors(FileInterceptor('file'))
    public async importExcel(@UploadedFile() file): Promise<ResultData> {
        try {
            const column = this.apiResourceService.getColumnDatas();
            const list = await this.apiResourceService.importExcel(column, file.buffer, true, 'buffer');
            return new ResultData(MessageType.GETLIST, { data: [], count: list.length }, true);
        } catch (e) {
            return new ResultData(MessageType.FILEERROR, false);
        }

    }

    /**
     * 创建excel
     */
    public async createExcel(): Promise<any> {
        const params = {
            rows: this.apiResourceService.getRowDatas(), // 要导出的数据
            columns: this.apiResourceService.getColumnDatas(), // 列头信息
            sheetName: '导出示例', // 工作簿名称
            filePath: join(__dirname, './apiResourceTemplate.xlsx'),
        };
        return await this.apiResourceService.createExcel(params);
    }

    /**
     * 获取功能列表
     * @param params
     */
    @Get('tree')
    public async getAuthorityTree(@Query('hasList') hasList = 'true') {
        try {
            const { data, count, listData } = await this.apiResourceService.getAuthorityTree();
            const resData = hasList == 'true' ? { data, count, listData } : { data, count };
            return new ResultData(MessageType.GETLIST, resData, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
        }
    }
}
