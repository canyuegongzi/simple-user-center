import {Body, Controller, Get, Headers, Inject, Post, Query, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/transform.interceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/logging.interceptor';
import { RoleService } from '../service/service/role.service';
import { CreateRoleDto } from '../model/DTO/role/create_role.dto';
import { UpdateRoleDto } from '../model/DTO/role/update_role.dto';
import {QueryRoleDto} from '../model/DTO/role/query_role.dto';
import {AddAuthDto} from '../model/DTO/role/add_auth';
import {AddResourceRole} from '../model/DTO/apiResource/add_resource_role';
import {MessageType, ResultData} from '../common/result/ResultData';
import {UserService} from '../service/service/user.service';

@Controller('role')
export class RoleController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(RoleService) private readonly roleService: RoleService,
  ) {}

  /*
    添加角色
   */
  @Post('add')
  public async creatUser(@Body() createUserDto: CreateRoleDto) {
    try {
      const res = await this.roleService.checkName(createUserDto.name);
      if (res) {
        return  { code: 200, message: '该角色已经存在', success: false };
      }
    } catch (e) {
      return  { code: 200, message: e.errorMessage, success: false };
    }
    try {
      const res1: any = await this.roleService.creatRole(createUserDto);
      return  { code: 200, message: '操作成功', success: true };
    } catch (e) {
      return  { code: 200, message: e.errorMessage, success: false };
    }
  }

  /**
   * 更新角色
   * @param updateRoleDto
   */
  @Post('update')
  public async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
    try {
      const res =  await this.roleService.updateRole(updateRoleDto);
      return {code: 200, message: '更新成功', success: true};
    } catch (e) {
      return {code: 400, message: e.errorMessage, success: false};
    }
  }

  @Post('delete')
  public async deleteRole(@Body('id') id: Array<number| string>) {
    try {
      await this.roleService.deleteRole(id);
      return new ResultData(MessageType.DELETE,  true, true);
    } catch (e) {
      return new ResultData(MessageType.DELETE,  false, false);
    }
  }

  @Get('getRoleInfo')
  public async getRoleInfo(@Query('id') id: any) {
    try {
      const res = await this.roleService.getRoleInfo(id);
      return {code: 200, data: res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }

  @Get('list')
  public async getList(@Query() params: QueryRoleDto) {
      try {
        const res = await this.roleService.getList(params);
        return new ResultData(MessageType.GETLIST,  res, true);
      } catch (e) {
        return {code: 200, data: [], message: '查询失败'};
      }
   }

  @Get('all')
  public async getAllList() {
    try {
      const res = await this.roleService.getAllList();
      return new ResultData(MessageType.GETLIST,  res, true);
    } catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }

  /**
   * 角色授权(菜单)
   * @param params
   */
  @Post('addAuthToRole')
   public async addAuthToRole(@Body() params: AddAuthDto) {
    try {
      const res = await this.roleService.addAuthToRole(params);
      return {code:  200 , message:  '操作成功', success: true};
    } catch (e) {
      return {code: 200, message: e.errorMessage, success: false};
    }
  }

  /**
   * 角色授权(菜单)
   * @param params
   */
  @Post('addApiAuthToRole')
  public async addApiResourceToRole(@Body() params: AddResourceRole) {
    try {
      const res = await this.roleService.addApiResourceToRole(params);
      return {code:  200 , message:  '操作成功', success: true};
    } catch (e) {
      return {code: 200, message: e.errorMessage, success: false};
    }
  }

  /**
   * 查询角色权限
   * @param id
   */
  @Get('authByRole')
  public async getAuthByRole(@Query('id') id: any,  @Headers('token') token: string) {
    try {
      const res = await this.roleService.getAuthByRole(id);
      return {code:  200 , data: res, message:  '操作成功'};
    } catch (e) {
      return {code: 200, data: [], message: e.errorMessage};
    }
  }

  /**
   * 查询角色接口资源权限
   * @param id
   */
  @Get('authApiByRole')
  public async getApiAuthByRole(@Query('id') id: any) {
    try {
      const res = await this.roleService.getApiAuthByRole(id);
      return new ResultData(MessageType.GETLIST,  res, true);
    } catch (e) {
      return {code: 200, data: [], message: e.errorMessage};
    }
  }
}
