import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/transform.interceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/logging.interceptor';
import { AuthorityService } from '../service/service/authority.service';
import {CreateAuthorityDto} from '../model/DTO/authority/create_authority.dto';
import {UpdateAuthorityDto} from '../model/DTO/authority/update_authority.dto';
import {QueryAuthorityDto} from '../model/DTO/authority/query_authority.dto';
import {QueryMenuDto} from '../model/DTO/authority/query_menus.dto';

@Controller('authority')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
// @UseGuards(RolesGuard)
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
      const res1 = await this.authorityService.createAuthority(params);
      return {code: 200,  message: '操作成功', success: true};
    } catch (e) {
      return {code: 200,  message: e.errorMessage, success: false};
    }
  }

  /**
   * 更新功能信息
   * @param params
   */
  @Post('update')
  public async updateAuthority(@Body() params: UpdateAuthorityDto) {
    try {
      const res = await this.authorityService.updateAuthority(params);
      return {code: 200,  message: '操作成功', success: true};
    } catch (e) {
      return {code: 200,  message: e.errorMessage, success: false};
    }
  }

  /**
   * 删除功能
   * @param params
   */
  @Post('delete')
  public async deleteAuthority(@Body('id') params: Array<string| number>) {
    try {
      const res = await this.authorityService.deleteAuthority(params);
      return {code: 200, message: '操作成功', success: true};
    } catch (e) {
      return {code: 200,  message: e.errorMessage, success: false};
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
      return {code: 200, data: {data: res[0], count: res[1]}, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: e.errorMessage};
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
      return {code: 200, data: {data: res[0], count: res[1]}, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: e.errorMessage};
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
      return {code: 200, res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: e.errorMessage};
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
      return {code: 200, data: res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: '查询失败'};
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
      return {code: 200, data: res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: e.errorMessage};
    }
  }

}
