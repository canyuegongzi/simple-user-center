import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/transform.interceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/logging.interceptor';
import {SystemService} from '../service/service/system.service';
import {UpdateSystemDto} from '../model/DTO/system/update_system.dto';
import {QuerySystemDto} from '../model/DTO/system/system_role.dto';
import {CreateSystemDto} from '../model/DTO/system/create_system.dto';

@Controller('system')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
// @UseGuards(RolesGuard)
export class SystemController {
  constructor(
      @Inject(SystemService) private readonly systemService: SystemService,
  ) {
  }

  /**
   * 添加系统
   * @param createSystemDto
   */
  @Post('add')
  public async creatUser(@Body() createSystemDto: CreateSystemDto) {
    try {
      const res = await this.systemService.checkValue(createSystemDto.name);
      if (res) {
        return  { code: 200, message: '该角色已经存在', success: false };
      }
    }catch (e) {
      return  { code: 200, message: e.errorMessage, success: false };
    }
    try {
      const res1: any = await this.systemService.creatSystem(createSystemDto);
      return  { code: 200, message: '操作成功', success: true };
    }catch (e) {
      return  { code: 200, message: e.errorMessage, success: false };
    }
  }

  /**
   * 更新系统
   * @param updateRoleDto
   */
  @Post('update')
  public async updateRole(@Body() updateSystemDto: UpdateSystemDto) {
    try {
      const res =  await this.systemService.updateSystem(updateSystemDto);
      return {code: 200, message: '更新成功', success: true};
    }catch (e) {
      return {code: 400, message: e.errorMessage, success: false};
    }
  }

  /**
   * 删除系统
   * @param id
   */
  @Post('delete')
  public async deleteRole(@Body('id') id: Array<number| string>) {
    try {
      const res = await this.systemService.deleteSystem(id);
      return {code: 200,  message: '删除成功', success: true};
    }catch (e) {
      return {code: 400, message: '删除失败', success: false};
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
      return {code: 200, data: res, message: '查询成功'};
    }catch (e) {
      return {code: 200, data: [], message: '查询失败'};
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
      return {code: 200, data: res, message: '查询成功'};
    }catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }

  /**
   * 所有系统
   */
  @Get('all')
  public async getAllList() {
    try {
      const res = await this.systemService.getAllList();
      return {code: 200, data: res, message: '查询成功'};
    }catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }
}
