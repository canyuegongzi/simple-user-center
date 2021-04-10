import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import {SystemService} from '../service/SystemService';
import {UpdateSystemDto} from '../model/DTO/system/update_system.dto';
import {QuerySystemDto} from '../model/DTO/system/system_role.dto';
import {CreateSystemDto} from '../model/DTO/system/create_system.dto';
import {MessageType, ResultData} from '../common/result/ResultData';

@Controller('system')
export class SystemController {
    constructor(@Inject(SystemService) private readonly systemService: SystemService) {}

    /**
     * 添加系统
     * @param createSystemDto
     */
    @Post('add')
    public async creatUser(@Body() createSystemDto: CreateSystemDto) {
        try {
            const res = await this.systemService.checkValue(createSystemDto.name);
            if (res) {
                return new ResultData('该系统已经存在', null, false);
            }
            await this.systemService.creatSystem(createSystemDto);
            return new ResultData(MessageType.CREATE, createSystemDto, true);
        } catch (e) {
            return  new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 更新系统
     * @param updateRoleDto
     */
    @Post('update')
    public async updateRole(@Body() updateSystemDto: UpdateSystemDto) {
        try {
            await this.systemService.updateSystem(updateSystemDto);
            return new ResultData(MessageType.UPDATE, updateSystemDto, true);
        } catch (e) {
            return new ResultData(e.errorMessage, updateSystemDto, false);
        }
    }

    /**
     * 删除系统
     * @param id
     */
    @Post('delete')
    public async deleteRole(@Body('id') id: Array<number| string>) {
        try {
            await this.systemService.deleteSystem(id);
            return new ResultData(MessageType.DELETE, true, true);
        } catch (e) {
            return new ResultData(e.errorMessage, false, false);
        }
    }

    /**
     * 获取系统详情
     * @param id
     */
    @Get('info')
    public async getRoleInfo(@Query('id') id: any) {
        try {
            const res = await this.systemService.getSystemInfo(id);
            return new ResultData(MessageType.GETINFO, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
        }
    }

    /**
     * 获取系统列表
     * @param params
     */
    @Get('list')
    public async getList(@Query() params: QuerySystemDto) {
        try {
            const res = await this.systemService.getList(params);
            return new ResultData(MessageType.GETINFO, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
        }
    }

    /**
     * 所有系统
     */
    @Get('all')
    public async getAllList() {
        try {
            const res = await this.systemService.getAllList();
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
        }
    }
}
