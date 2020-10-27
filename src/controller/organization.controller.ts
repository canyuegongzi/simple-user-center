import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/transform.interceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/logging.interceptor';
import { OrganizationService } from '../service/service/organization.service';
import {CreateOrganizationDto} from '../model/DTO/organization/create_organization.dto';
import {AddUserDto} from '../model/DTO/organization/add_user.dto';
import {QueryOrganizationDto} from '../model/DTO/organization/query_organization.dto';
import {UpdateOrganizationDto} from '../model/DTO/organization/update_organization.dto';
import {DeleteOrganizationDto} from '../model/DTO/organization/delete_organization.dto';

@Controller('organization')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class OrganizationController {
  constructor(
    @Inject(OrganizationService) private readonly organizationService: OrganizationService,
  ) {}

  /**
   * 创建组织
   * @param createOrganizationDto
   */
  @Post('add')
  public async creatOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
    const res = await this.organizationService.findOneByName(createOrganizationDto.name);
    if (res) {
      return  { code: 200, message: '组织名被占用' };
    }
    try {
      const res1 = await this.organizationService.creatOrganization(createOrganizationDto);
      if (res1)  {
        return  { code: 200, message: '操作成功', success: true };
      }
    } catch (e) {
      return  { code: 200, message: e.errorMessage, success: false };
    }
  }

  /**
   * 添加用户到组织（同样使用于编辑）
   * @param addUserDto
   */
  @Post('addUser')
  public async addUserToOrganization(@Body() addUserDto: AddUserDto) {
    try {
      const res = await this.organizationService.addUserToOrganization(addUserDto);
      return { code: 200, message: '操作成功', success: true };
    } catch (e) {
      return  { code: 200, success: false,  message: e.errorMessage };
    }
  }

  /**
   * 查询列表
   * @param params
   */
  @Get('list')
  public async getList(@Query() params: QueryOrganizationDto) {
    try {
      const res = await this.organizationService.getList(params);
      return {code: 200, data: res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }

  /**
   * 所有组织
   * @param params
   */
  @Get('all')
  public async getAllList(@Query() params: QueryOrganizationDto) {
    try {
      const res = await this.organizationService.getAllList(params);
      return {code: 200, data: res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }

  /**
   * 查询组织用户树
   */
  @Get('organizationUserTree')
  public async getOrganizationUserTree() {
    try {
      const res = await this.organizationService.getOrganizationUserTree();
      return {code: 200, data: res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }

  /**
   * 查询组织树
   */
  @Get('organizationTree')
  public async getListOrganizationTree() {
    try {
      const res = await this.organizationService.getListOrganizationTree();
      return {code: 200, data: res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }

  /**
   * 更新组织信息
   */
  @Post('update')
  public async editOrganization(@Body() params: UpdateOrganizationDto) {
    try {
      await this.organizationService.updateOrganization(params);
      return  { code: 200, message: '操作成功', success: true };
    } catch (e) {
      return {code: 200, success: false, message: e.errorMessage};
    }
  }

  @Post('delete')
  public async deleteOrganization(@Body() params: DeleteOrganizationDto) {
    try {
      await this.organizationService.deleteOrganization(params);
      return  { code: 200, data: true, message: '操作成功', success: true };
    } catch (e) {
      return {code: 200, data: false, success: false, message: e.errorMessage};
    }
  }

  @Get('organizationInfo')
  public async getOrganizationInfo(@Query('id') id: any) {
    try {
      const res = await this.organizationService.getOrganizationInfo(id);
      return {code: 200, data: res, message: '查询成功'};
    } catch (e) {
      return {code: 200, data: [], message: '查询失败'};
    }
  }
}
