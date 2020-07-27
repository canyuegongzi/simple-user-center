import { SystemService } from '../service/service/system.service';
import { UpdateSystemDto } from '../model/DTO/system/update_system.dto';
import { QuerySystemDto } from '../model/DTO/system/system_role.dto';
import { CreateSystemDto } from '../model/DTO/system/create_system.dto';
export declare class SystemController {
    private readonly systemService;
    constructor(systemService: SystemService);
    creatUser(createSystemDto: CreateSystemDto): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    updateRole(updateSystemDto: UpdateSystemDto): Promise<{
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
        data: import("../model/entity/system.entity").System;
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    getList(params: QuerySystemDto): Promise<{
        code: number;
        data: {
            data: import("../model/entity/system.entity").System[];
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
        data: import("../model/entity/system.entity").System[];
        message: string;
    }>;
}
