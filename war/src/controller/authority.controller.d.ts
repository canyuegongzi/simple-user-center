import { AuthorityService } from '../service/service/authority.service';
import { CreateAuthorityDto } from '../model/DTO/authority/create_authority.dto';
import { UpdateAuthorityDto } from '../model/DTO/authority/update_authority.dto';
import { QueryAuthorityDto } from '../model/DTO/authority/query_authority.dto';
import { QueryMenuDto } from '../model/DTO/authority/query_menus.dto';
export declare class AuthorityController {
    private readonly authorityService;
    constructor(authorityService: AuthorityService);
    createAuthority(params: CreateAuthorityDto): Promise<{
        code: number;
        message: string;
        success?: undefined;
    } | {
        code: number;
        message: any;
        success: boolean;
    }>;
    updateAuthority(params: UpdateAuthorityDto): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    deleteAuthority(params: Array<string | number>): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    getAuthorityList(params: QueryAuthorityDto): Promise<{
        code: number;
        data: {
            data: import("../model/entity/authority.entity").Authority[];
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: any;
    }>;
    getAuthorityAllList(params: QueryAuthorityDto): Promise<{
        code: number;
        data: {
            data: import("../model/entity/authority.entity").Authority[];
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: any;
    }>;
    getAuthorityTree(): Promise<{
        code: number;
        res: {
            data: any;
            count: number;
        };
        message: string;
        data?: undefined;
    } | {
        code: number;
        data: any[];
        message: any;
        res?: undefined;
    }>;
    getAuthInfo(id: number | string): Promise<{
        code: number;
        data: import("../model/entity/authority.entity").Authority;
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    getMenus(params: QueryMenuDto): Promise<{
        code: number;
        data: any[];
        message: string;
    } | {
        code: number;
        data: any[];
        message: any;
    }>;
}
