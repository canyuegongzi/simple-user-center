import { RoleService } from '../service/service/role.service';
import { CreateRoleDto } from '../model/DTO/role/create_role.dto';
import { UpdateRoleDto } from '../model/DTO/role/update_role.dto';
import { QueryRoleDto } from '../model/DTO/role/query_role.dto';
import { AddAuthDto } from '../model/DTO/role/add_auth';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    creatUser(createUserDto: CreateRoleDto): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    updateRole(updateRoleDto: UpdateRoleDto): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    deleteRole(id: Array<number | string>): Promise<{
        code: number;
        message: string;
        success: boolean;
    }>;
    getRoleInfo(id: any): Promise<{
        code: number;
        data: import("../model/entity/role.entity").Role;
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    getList(params: QueryRoleDto): Promise<{
        code: number;
        data: {
            data: import("../model/entity/role.entity").Role[];
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    getAllList(): Promise<{
        code: number;
        data: import("../model/entity/role.entity").Role[];
        message: string;
    }>;
    addAuthToRole(params: AddAuthDto): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    getAuthByRole(id: any): Promise<{
        code: number;
        data: {
            data: import("../model/entity/role.entity").Role[];
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: any;
    }>;
}
