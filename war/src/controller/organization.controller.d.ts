import { OrganizationService } from '../service/service/organization.service';
import { CreateOrganizationDto } from '../model/DTO/organization/create_organization.dto';
import { AddUserDto } from '../model/DTO/organization/add_user.dto';
import { QueryOrganizationDto } from '../model/DTO/organization/query_organization.dto';
import { UpdateOrganizationDto } from '../model/DTO/organization/update_organization.dto';
import { DeleteOrganizationDto } from '../model/DTO/organization/delete_organization.dto';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    creatOrganization(createOrganizationDto: CreateOrganizationDto): Promise<{
        code: number;
        message: string;
        success?: undefined;
    } | {
        code: number;
        message: any;
        success: boolean;
    }>;
    addUserToOrganization(addUserDto: AddUserDto): Promise<{
        code: number;
        success: boolean;
        message: any;
    }>;
    getList(params: QueryOrganizationDto): Promise<{
        code: number;
        data: {
            data: import("../model/entity/organization.entity").Organization[];
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    getAllList(params: QueryOrganizationDto): Promise<{
        code: number;
        data: {
            data: import("../model/entity/organization.entity").Organization[];
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    getOrganizationUserTree(): Promise<{
        code: number;
        data: {
            data: any;
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    getListOrganizationTree(): Promise<{
        code: number;
        data: {
            data: any;
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    editOrganization(params: UpdateOrganizationDto): Promise<{
        code: number;
        success: boolean;
        message: any;
    }>;
    deleteOrganization(params: DeleteOrganizationDto): Promise<{
        code: number;
        success: boolean;
        message: any;
    }>;
    getOrganizationInfo(id: any): Promise<{
        code: number;
        data: import("../model/entity/organization.entity").Organization;
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
}
