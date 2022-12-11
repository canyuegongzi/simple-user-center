import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../common/shared/interceptors/TransformInterceptor';
import { LoggingInterceptor } from '../common/shared/interceptors/LoggingInterceptor';
import { OrganizationService } from '../service/OrganizationService';
import { CreateOrganizationDto } from '../model/DTO/organization/CreateOrganizationDto';
import { AddUserDto } from '../model/DTO/organization/AddUserDto';
import { QueryOrganizationDto } from '../model/DTO/organization/QueryOrganizationDto';
import { UpdateOrganizationDto } from '../model/DTO/organization/UpdateOrganizationDto';
import { DeleteOrganizationDto } from '../model/DTO/organization/DeleteOrganizationDto';
import { MessageType, ResultData } from '../common/result/ResultData';
import { Organization } from '../model/entity/OrganizationEntity';

@Controller('organization')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class OrganizationController {
    constructor(@Inject(OrganizationService) private readonly organizationService: OrganizationService) {}

    /**
     * 创建组织
     * @param createOrganizationDto
     */
    @Post('add')
    public async creatOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
        try {
            const res: Organization = await this.organizationService.findOneByName(createOrganizationDto.name);
            if (res) {
                return new ResultData('组织名被占用', null, false);
            }
            const resCreateInfo = await this.organizationService.creatOrganization(createOrganizationDto);
            if (resCreateInfo)  {
                return new ResultData(MessageType.CREATE, resCreateInfo, true);
            }
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 添加用户到组织（同样使用于编辑）
     * @param addUserDto
     */
    @Post('addUser')
    public async addUserToOrganization(@Body() addUserDto: AddUserDto) {
        try {
            await this.organizationService.addUserToOrganization(addUserDto);
            return new ResultData(MessageType.UPDATE, addUserDto, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
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
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
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
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 查询组织用户树
     */
    @Get('organizationUserTree')
    public async getOrganizationUserTree() {
        try {
            const res = await this.organizationService.getOrganizationUserTree();
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 查询组织树
     */
    @Get('organizationTree')
    public async getListOrganizationTree() {
        try {
            const res = await this.organizationService.getListOrganizationTree();
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 更新组织信息
     */
    @Post('update')
    public async editOrganization(@Body() params: UpdateOrganizationDto) {
        try {
            await this.organizationService.updateOrganization(params);
            return new ResultData(MessageType.UPDATE, null, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    @Post('delete')
    public async deleteOrganization(@Body() params: DeleteOrganizationDto) {
        try {
            await this.organizationService.deleteOrganization(params);
            return new ResultData(MessageType.DELETE, null, true);
        } catch (e) {
            return new ResultData(e.errorMessage, false, false);
        }
    }

    @Get('organizationInfo')
    public async getOrganizationInfo(@Query('id') id: any) {
        try {
            const res = await this.organizationService.getOrganizationInfo(id);
            return new ResultData(MessageType.GETINFO, res, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }
}
