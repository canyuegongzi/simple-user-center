import { Body, Controller, Get, Headers, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { RoleService } from '../service/RoleService';
import { CreateRoleDto } from '../model/DTO/role/CreateRoleDto';
import { UpdateRoleDto } from '../model/DTO/role/UpdateRoleDto';
import { QueryRoleDto } from '../model/DTO/role/QueryRoleDto';
import { AddAuthDto } from '../model/DTO/role/AddAuthDto';
import { AddResourceRoleDto } from '../model/DTO/apiResource/AddResourceRoleDto';
import { MessageType, ResultData } from '../common/result/ResultData';
import { UserService } from '../service/UserService';
import { Role } from '../model/entity/RoleEntity';

@Controller('role')
export class RoleController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(RoleService) private readonly roleService: RoleService,
    ) {}

    /**
     * 添加角色
     * @param createUserDto
     */
    @Post('add')
    public async creatUser(@Body() createUserDto: CreateRoleDto) {
        try {
            const res: Role = await this.roleService.checkName(createUserDto.name);
            if (res) {
                return new ResultData('该角色已经存在', null, false);
            }
            await this.roleService.creatRole(createUserDto);
            return new ResultData(MessageType.CREATE, createUserDto, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 更新角色
     * @param updateRoleDto
     */
    @Post('update')
    public async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
        try {
            await this.roleService.updateRole(updateRoleDto);
            return new ResultData(MessageType.UPDATE, updateRoleDto, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 删除角色
     * @param id
     */
    @Post('delete')
    public async deleteRole(@Body('id') ids: Array<number| string>) {
        try {
            await this.roleService.deleteRole(ids);
            return new ResultData(MessageType.DELETE, true, true);
        } catch (e) {
            return new ResultData(MessageType.DELETE, false, false);
        }
    }

    /**
     * 获取角色详情
     * @param id
     */
    @Get('getRoleInfo')
    public async getRoleInfo(@Query('id') id: any) {
        try {
            const res = await this.roleService.getRoleInfo(id);
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
        }
    }

    @Get('list')
    public async getList(@Query() params: QueryRoleDto) {
        try {
            const res = await this.roleService.getList(params);
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
        }
    }

    @Get('all')
    public async getAllList() {
        try {
            const res = await this.roleService.getAllList();
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
        }
    }

    /**
     * 角色授权(菜单)
     * @param params
     */
    @Post('addAuthToRole')
    public async addAuthToRole(@Body() params: AddAuthDto) {
        try {
            await this.roleService.addAuthToRole(params);
            return new ResultData(MessageType.UPDATE, null, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 角色授权(接口)
     * @param params
     */
    @Post('addApiAuthToRole')
    public async addApiResourceToRole(@Body() params: AddResourceRoleDto) {
        try {
            const res = await this.roleService.addApiResourceToRole(params);
            return new ResultData(MessageType.UPDATE, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
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
            return new ResultData(MessageType.UPDATE, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
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
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, [], false);
        }
    }
}
