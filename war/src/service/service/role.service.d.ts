import { Repository } from 'typeorm';
import { Role } from '../../model/entity/role.entity';
import { CreateRoleDto } from '../../model/DTO/role/create_role.dto';
import { UpdateRoleDto } from '../../model/DTO/role/update_role.dto';
import { QueryRoleDto } from '../../model/DTO/role/query_role.dto';
import { AddAuthDto } from '../../model/DTO/role/add_auth';
import { Authority } from '../../model/entity/authority.entity';
export declare class RoleService {
    private readonly roleRepository;
    private readonly authorityRepository;
    constructor(roleRepository: Repository<Role>, authorityRepository: Repository<Authority>);
    creatRole(role: CreateRoleDto): Promise<Role>;
    updateRole(role: UpdateRoleDto): Promise<import("typeorm").UpdateResult>;
    deleteRole(ids: Array<number | string>): Promise<import("typeorm").UpdateResult>;
    getRoleInfo(query: string): Promise<Role>;
    checkCode(query: string): Promise<Role>;
    checkName(query: string): Promise<Role>;
    getList(query: QueryRoleDto): Promise<{
        data: Role[];
        count: number;
    }>;
    getAllList(): Promise<Role[]>;
    addAuthToRole(params: AddAuthDto): Promise<Role>;
    getAuthByRole(id: any): Promise<{
        data: Role[];
        count: number;
    }>;
}
