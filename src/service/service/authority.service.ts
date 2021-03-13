import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateAuthorityDto} from '../../model/DTO/authority/create_authority.dto';
import {UpdateAuthorityDto} from '../../model/DTO/authority/update_authority.dto';
import {DeleteAuthorityDto} from '../../model/DTO/authority/delete_authority.dto';
import {QueryAuthorityDto} from '../../model/DTO/authority/query_authority.dto';
import {ApiException} from '../../common/error/exceptions/api.exception';
import {ApiErrorCode} from '../../config/api-error-code.enum';
import {listConvertTree, listToTree} from '../../utils/tree-data';
import {Authority} from '../../model/entity/authority.entity';
import {QueryMenuDto} from '../../model/DTO/authority/query_menus.dto';
import {User} from '../../model/entity/user.entity';
import {Role} from '../../model/entity/role.entity';
import {formatDate} from '../../utils/data-time';

@Injectable()
export class AuthorityService {
  constructor(
    @InjectRepository(Authority) private readonly authorityRepository: Repository<Authority>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * 添加功能
   * @param params
   */
  public async createAuthority(params: CreateAuthorityDto)  {
    try {
      return await this.authorityRepository
          .createQueryBuilder('a')
          .insert()
          .into(Authority)
          .values([{
            name: params.name,
            code: params.code,
            crateTime: formatDate(),
            system: params.system,
            value: params.value ? params.value : '',
            desc: params.desc,
            icon: params.icon,
            path: params.path,
            parentId: params.parentId }])
          .execute();
    } catch (e) {
      throw new ApiException('操作失败', ApiErrorCode.AUTHORITY_CREATED_FILED, 200);
    }
  }

  /**
   * 更新功能信息
   * @param params
   */
  public async updateAuthority(params: UpdateAuthorityDto) {
    try {
      return await this.authorityRepository
          .createQueryBuilder('a')
          .update(Authority)
          .set({
            name: params.name,
            parentName: '',
            desc: params.desc || '',
            parentId: params.parentId,
            updateTime: formatDate(),
            value: params.value ? params.value : '',
            system: params.system,
            icon: params.icon || '',
            path: params.path })
          .where('id = :id', { id: params.id })
          .execute();
    } catch (e) {
      throw new ApiException('操作失败', ApiErrorCode.AUTHORITY_UPDATE_FILED, 200);
    }
  }

  /**
   * 删除功能
   * @param params
   */
  public async deleteAuthority(params: Array<string | number>) {
    try {
      return await this.authorityRepository
          .createQueryBuilder('a')
          .update(Authority)
          .set({isDelete: 1, deleteTime: formatDate()})
          .whereInIds(params)
          .execute();
    } catch (e) {
      throw new ApiException('操作失败', ApiErrorCode.AUTHORITY_DELETE_FILED, 200);
    }
  }

  /**
   * 获取功能列表
   * @param params
   */
  public async getAuthorityList(params: QueryAuthorityDto) {
    try {
      const queryConditionList = ['a.isDelete = :isDelete'];
      if (params.name) {
        queryConditionList.push('a.name LIKE :name');
      }
      if (params.system) {
        queryConditionList.push('a.system = :system');
      }
      const queryCondition = queryConditionList.join(' AND ');
      return  await this.authorityRepository
          .createQueryBuilder('a')
          .where(queryCondition, {
            name: `%${params.name}%`,
            system: params.system,
            isDelete: 0,
          })
          .orderBy('a.system', 'ASC')
          .skip((params.page - 1) * params.pageSize)
          .take(params.pageSize)
          .getManyAndCount();
    } catch (e) {
      throw new ApiException('查询失败', ApiErrorCode.AUTHORITY_LIST_FILED, 200);
    }
  }

  /**
   * 获取功能列表
   * @param params
   */
  public async getAuthorityAllList(params: QueryAuthorityDto) {
    try {
      const queryConditionList = ['a.isDelete = :isDelete'];
      if (params.system) {
        queryConditionList.push('a.system = :system');
      }
      const queryCondition = queryConditionList.join(' AND ');
      return  await this.authorityRepository
          .createQueryBuilder('a')
          .where(queryCondition, {
            system: params.system,
            isDelete: 0,
          })
          .getManyAndCount();
    } catch (e) {
      throw new ApiException('查询失败', ApiErrorCode.AUTHORITY_LIST_FILED, 200);
    }
  }
  /**
   * 获取菜单
   * @param params
   */
  public async getMenus(params: QueryMenuDto)  {
    try {
      const queryConditionList = ['a.isDelete = :isDelete', 'r.id = :id'];
      if (params.system) {
        queryConditionList.push('a.system = :system');
      }
      let id = null;
      const queryCondition = queryConditionList.join(' AND ');
      if (!params.roleId) {
          const user: User = await this.userRepository.findOne({ name: params.user }, {relations: ['role']});
          if (!user) {
              throw new ApiException('用户不存在', ApiErrorCode.AUTHORITY_LIST_FILED, 200);
          }
          if (!user.role) {
              throw new ApiException('角色错误', ApiErrorCode.AUTHORITY_LIST_FILED, 200);
          }
          id = user.role.id;
      }
      id = params.roleId;
      const res: [Role[], number] = await this.roleRepository
          .createQueryBuilder('r')
          .leftJoinAndSelect('r.authority', 'a')
          .where(queryCondition, {
            id,
            system: params.system,
            isDelete: 0,
          })
          .getManyAndCount();
      let menus = [];
      if (res[0][0].authority.length) {
            menus = listToTree(res[0][0].authority, 'id', 'parentId', 'children');
      }
      return menus;
    } catch (e) {
      throw new ApiException(e.errorMessage, ApiErrorCode.AUTHORITY_LIST_FILED, 200);
    }
  }
  /**
   * 获取功能列表树
   * @param params
   */
  public async getAuthorityTree() {
    try {
      const res = await this.authorityRepository
          .createQueryBuilder('a')
          .orderBy('a.name', 'ASC')
          .getManyAndCount();
      const treeData = listToTree(res[0], 'id', 'parentId', 'children');
      return  { data: treeData, count: res[1]};
    } catch (e) {
      throw new ApiException('查询失败', ApiErrorCode.AUTHORITY_LIST_FILED, 200);
    }
  }

  /**
   * 通过code 查询
   * @param name
   */
  public async findOneByCode(code: string): Promise<Authority> {
    try {
      return await this.authorityRepository.findOne({ code });
    } catch (e) {
      throw new ApiException('查询失败', ApiErrorCode.AUTHORITY_CODE_INFO_FILED, 200);
    }
  }

  /**
   * 获取详情
   * @param id
   */
  public async getAuthInfo(id: any): Promise<Authority> {
    try {
      return await this.authorityRepository.findOne({ id });
    } catch (e) {
      throw new ApiException('查询失败', ApiErrorCode.AUTHORITY_CODE_INFO_FILED, 200);
    }
  }
}
