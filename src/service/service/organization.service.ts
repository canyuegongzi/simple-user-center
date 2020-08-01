import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { CreateOrganizationDto } from '../..//model/DTO/organization/create_organization.dto';
import { Organization } from '../../model/entity/organization.entity';
import {ApiException} from '../../common/error/exceptions/api.exception';
import {ApiErrorCode} from '../../config/api-error-code.enum';
import {User} from '../../model/entity/user.entity';
import {AddUserDto} from '../../model/DTO/organization/add_user.dto';
import {QueryOrganizationDto} from '../../model/DTO/organization/query_organization.dto';
import { listToTree} from '../../utils/tree-data';
import {UpdateOrganizationDto} from '../../model/DTO/organization/update_organization.dto';
import {DeleteOrganizationDto} from '../../model/DTO/organization/delete_organization.dto';
import {formatDate} from '../../utils/data-time';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 创建组织
   * @param createOrganizationDto
   */
    async creatOrganization(createOrganizationDto: CreateOrganizationDto): Promise<any> {
      try {
        let currentOrgan: Organization;
        currentOrgan = await this.organizationRepository.findOne({id: createOrganizationDto.parentId});
        if (!currentOrgan) {
            currentOrgan = new Organization();
        }
        const user =  await this.userRepository
            .createQueryBuilder('u')
            .where('u.id = :id', { id: createOrganizationDto.leaderId})
            .getOne();
        const newOrganization = new Organization();
        newOrganization.leader = user;
        newOrganization.name  = createOrganizationDto.name;
        newOrganization.desc = createOrganizationDto.desc || '';
        newOrganization.parentId = createOrganizationDto.parentId;
        newOrganization.parentName = currentOrgan.name;
        newOrganization.crateTime = formatDate();
        newOrganization.updateTime = formatDate();
        return await this.organizationRepository.save(newOrganization);
      } catch (e) {
          console.log(e);
          throw new ApiException('操作失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
      }
    }

  /**
   * 通过用户名查看
   * @param name
   */
    public async findOneByName(name: string): Promise<Organization> {
      return await this.organizationRepository.findOne({ name });
    }

  /**
   * 为组织添加用户
   * @param addUserDto
   */
    public async addUserToOrganization(addUserDto: AddUserDto) {
        try {
            try {
                const organization = await this.organizationRepository.findOne(addUserDto.orId, {relations: ['users']});
                if (!organization) {
                    throw new ApiException('请先添加组织', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
                }
                const usersId = addUserDto.orId ? addUserDto.orId : [];
                await this.organizationRepository
                    .createQueryBuilder()
                    .relation(Organization, 'users')
                    .of(usersId)
                    .addAndRemove(addUserDto.userId, organization.users.map( u => u.id));
                return await this.organizationRepository.findOne(usersId, {relations: [ 'users' ]});
            } catch (e) {
                throw new ApiException('用户查询失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
            }
        } catch (e) {
          throw new ApiException('操作失败', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
        }
    }

    /**
     * 查询组织列表
     * @param query
     */
    public async getList(query: QueryOrganizationDto) {
        try {
            const queryConditionList = ['o.isDelete = :isDelete'];
            if (query.name) {
                queryConditionList.push('o.name LIKE :name');
            }
            const queryCondition = queryConditionList.join(' AND ');
            const res = await this.organizationRepository
                .createQueryBuilder('o')
                .leftJoinAndSelect('o.leader', 'l')
                .where(queryCondition, {
                    name: `${query.name}`,
                    isDelete: 0,
                })
                .orderBy('o.name', 'ASC')
                .skip((query.page - 1) * query.pageSize)
                .take(query.pageSize)
                .select([
                    'o',
                    'l.id',
                    'l.name',
                ])
                .getManyAndCount();
            return  { data: res[0], count: res[1]};
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

    /**
     * 查询组织列表
     * @param query
     */
    public async getAllList(query: QueryOrganizationDto) {
        try {
            const queryConditionList = ['o.isDelete = :isDelete'];
            const queryCondition = queryConditionList.join(' AND ');
            const res = await this.organizationRepository
                .createQueryBuilder('o')
                .leftJoinAndSelect('o.leader', 'l')
                .where(queryCondition, {
                    isDelete: 0,
                })
                .select([
                    'o',
                    'l.id',
                    'l.name',
                ])
                .getManyAndCount();
            return  { data: res[0], count: res[1]};
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

    /**
     * 查询组织树
     */
    public async getListOrganizationTree() {
        try {
            const res = await this.organizationRepository
                .createQueryBuilder('o')
                .getManyAndCount();
            const treeData = listToTree(res[0], 'id', 'parentId', 'children');
            return  { data: treeData, count: res[1]};
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

    /**
     * 查询组织用户列表树结构
     */
    public async getOrganizationUserTree() {
        try {
            const res = await this.organizationRepository
                .createQueryBuilder('o')
                .leftJoinAndSelect('o.users', 'u')
                .orderBy('u.name', 'ASC')
                .getManyAndCount();
            const treeData = listToTree(res[0], 'id', 'parentId', 'children');
            return  { data: treeData, count: res[1]};
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

    /**
     * 更新组织信息
     * @param params
     */
    public async updateOrganization(params: UpdateOrganizationDto) {
        try {
            let user: User;
            let currentOrganName: string;
            try {
                user = await this.userRepository.findOne(params.leaderId);
            } catch (e) {
                throw new ApiException('领导人不存在', ApiErrorCode.ORIZATION_UPDATE_USER_NOT, 200);
            }
            if (Number(params.parentId) !== -1) {
                try {
                    const currentOrgan: Organization = await this.organizationRepository.findOne({id: params.parentId});
                    currentOrganName = currentOrgan.name;
                } catch (e) {
                    throw new ApiException('父级不存在', ApiErrorCode.ORIZATION_CREATED_FILED, 200);
                }
            } else {
                currentOrganName = '';
            }
            return await this.organizationRepository
                .createQueryBuilder('o')
                .update(Organization)
                .set({
                    desc: params.desc,
                    name: params.name,
                    parentId: params.parentId,
                    leader: user,
                    crateTime: formatDate(),
                    updateTime: formatDate(),
                    parentName: currentOrganName,
                })
                .where('id = :id', { id: params.id })
                .execute();
        } catch (e) {
            throw new ApiException('操作失败', ApiErrorCode.ORIZATION_UPDATE_FILED, 200);
        }
    }

    /**
     * 删除组织
     * @param id
     */
    public async deleteOrganization(params: DeleteOrganizationDto) {
        try {
            if (params.isDeleteChild === 1) {
                return  await this.organizationRepository
                    .createQueryBuilder()
                    .delete()
                    .from(Organization)
                    .whereInIds(params.id)
                    .execute();
            } else {
                return  await this.organizationRepository
                    .createQueryBuilder()
                    .delete()
                    .from(Organization)
                    .whereInIds(params.id)
                    .execute();
            }
        } catch (e) {
            throw new ApiException('操作失败', ApiErrorCode.ORIZATION_DELETE_FILED, 200);
        }
    }

    /**
     * 获取组织详情
     * @param query
     */
    public async getOrganizationInfo(query: string) {
        try {
            return await this.organizationRepository
                .createQueryBuilder('r')
                .leftJoinAndSelect('r.leader', 'l')
                .leftJoinAndSelect('r.users', 'u')
                .where('r.id = :id', { id: query})
                .select([
                    'r',
                    'l.id',
                    'l.name',
                    'u.id',
                    'u.name',
                ])
                .getOne();
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.ROLE_LIST_FAILED, 200);
        }
    }
}
