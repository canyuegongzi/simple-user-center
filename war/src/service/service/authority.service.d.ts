import { Repository } from 'typeorm';
import { CreateAuthorityDto } from '../../model/DTO/authority/create_authority.dto';
import { UpdateAuthorityDto } from '../../model/DTO/authority/update_authority.dto';
import { QueryAuthorityDto } from '../../model/DTO/authority/query_authority.dto';
import { Authority } from '../../model/entity/authority.entity';
import { QueryMenuDto } from '../../model/DTO/authority/query_menus.dto';
import { User } from '../../model/entity/user.entity';
import { Role } from '../../model/entity/role.entity';
export declare class AuthorityService {
    private readonly authorityRepository;
    private readonly userRepository;
    private readonly roleRepository;
    constructor(authorityRepository: Repository<Authority>, userRepository: Repository<User>, roleRepository: Repository<Role>);
    createAuthority(params: CreateAuthorityDto): Promise<import("typeorm").InsertResult>;
    updateAuthority(params: UpdateAuthorityDto): Promise<import("typeorm").UpdateResult>;
    deleteAuthority(params: Array<string | number>): Promise<import("typeorm").UpdateResult>;
    getAuthorityList(params: QueryAuthorityDto): Promise<[Authority[], number]>;
    getAuthorityAllList(params: QueryAuthorityDto): Promise<[Authority[], number]>;
    getMenus(params: QueryMenuDto): Promise<any[]>;
    getAuthorityTree(): Promise<{
        data: any;
        count: number;
    }>;
    findOneByCode(code: string): Promise<Authority>;
    getAuthInfo(id: any): Promise<Authority>;
}
