import { Repository } from 'typeorm';
import { CreateOrganizationDto } from '../..//model/DTO/organization/create_organization.dto';
import { Organization } from '../../model/entity/organization.entity';
import { User } from '../../model/entity/user.entity';
import { AddUserDto } from '../../model/DTO/organization/add_user.dto';
import { QueryOrganizationDto } from '../../model/DTO/organization/query_organization.dto';
import { UpdateOrganizationDto } from '../../model/DTO/organization/update_organization.dto';
import { DeleteOrganizationDto } from '../../model/DTO/organization/delete_organization.dto';
export declare class OrganizationService {
    private readonly organizationRepository;
    private readonly userRepository;
    constructor(organizationRepository: Repository<Organization>, userRepository: Repository<User>);
    creatOrganization(createOrganizationDto: CreateOrganizationDto): Promise<any>;
    findOneByName(name: string): Promise<Organization>;
    addUserToOrganization(addUserDto: AddUserDto): Promise<Organization>;
    getList(query: QueryOrganizationDto): Promise<{
        data: Organization[];
        count: number;
    }>;
    getAllList(query: QueryOrganizationDto): Promise<{
        data: Organization[];
        count: number;
    }>;
    getListOrganizationTree(): Promise<{
        data: any;
        count: number;
    }>;
    getOrganizationUserTree(): Promise<{
        data: any;
        count: number;
    }>;
    updateOrganization(params: UpdateOrganizationDto): Promise<import("typeorm").UpdateResult>;
    deleteOrganization(params: DeleteOrganizationDto): Promise<import("typeorm").DeleteResult>;
    getOrganizationInfo(query: string): Promise<Organization>;
}
