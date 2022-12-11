import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthorityService } from '../service/AuthorityService';
import { CreateAuthorityDto } from '../model/DTO/authority/CreateAuthorityDto';
import { UpdateAuthorityDto } from '../model/DTO/authority/UpdateAuthorityDto';
import { QueryAuthorityDto } from '../model/DTO/authority/QueryAuthorityDto';
import { QueryMenuDto } from '../model/DTO/authority/QueryMenusDto';
import { MessageType, ResultData } from '../common/result/ResultData';

@Controller('authority')
export class AuthorityController {
    constructor(
        @Inject(AuthorityService) private readonly authorityService: AuthorityService,
    ) {}

    /**
     * 添加功能
     * @param params
     */
    @Post('add')
    public async createAuthority(@Body() params: CreateAuthorityDto)  {
        try {
            const res = await this.authorityService.findOneByCode(params.code);
            if (res) {
                return  { code: 200, message: '组织名已经存在' };
            }
            await this.authorityService.createAuthority(params);
            return new ResultData(MessageType.CREATE, params, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 更新功能信息
     * @param params
     */
    @Post('update')
    public async updateAuthority(@Body() params: UpdateAuthorityDto) {
        try {
            await this.authorityService.updateAuthority(params);
            return new ResultData(MessageType.CREATE, params, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 删除功能
     * @param params
     */
    @Post('delete')
    public async deleteAuthority(@Body('id') params: Array<string| number>) {
        try {
            await this.authorityService.deleteAuthority(params);
            return new ResultData(MessageType.DELETE, params, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 获取功能列表
     * @param params
     */
    @Get('list')
    public async getAuthorityList(@Query() params: QueryAuthorityDto) {
        try {
            const res = await this.authorityService.getAuthorityList(params);
            return new ResultData(MessageType.GETLIST, { data: res[0], count: res[1] } , true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 获取功能列表
     * @param params
     */
    @Get('all')
    public async getAuthorityAllList(@Query() params: QueryAuthorityDto) {
        try {
            const res = await this.authorityService.getAuthorityAllList(params);
            return new ResultData(MessageType.GETLIST, { data: res[0], count: res[1] } , true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 获取功能列表
     * @param params
     */
    @Get('tree')
    public async getAuthorityTree() {
        try {
            const res = await this.authorityService.getAuthorityTree();
            return new ResultData(MessageType.GETLIST, res , true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 获取资源详情
     * @param id
     */
    @Get('getAuthInfo')
    public async getAuthInfo(@Query('id') id: number |string) {
        try {
            const res = await this.authorityService.getAuthInfo(id);
            return new ResultData(MessageType.GETLIST, res , true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 获取系统菜单
     * @param params
     */
    @Get('sysMenus')
    public async getMenus(@Query() params: QueryMenuDto) {
        try {
            const res = await this.authorityService.getMenus(params);
            return new ResultData(MessageType.GETLIST, res , true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

}
