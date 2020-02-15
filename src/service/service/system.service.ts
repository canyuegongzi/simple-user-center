import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {System} from '../../model/entity/system.entity';
import {CreateSystemDto} from '../../model/DTO/system/create_system.dto';
import {formatDate} from '../../utils/data-time';
import {ApiException} from '../../common/error/exceptions/api.exception';
import {ApiErrorCode} from '../../config/api-error-code.enum';
import {UpdateSystemDto} from '../../model/DTO/system/update_system.dto';
import {QuerySystemDto} from '../../model/DTO/system/system_role.dto';

@Injectable()
export class SystemService {
    constructor(
        @InjectRepository(System)
        private readonly systemRepository: Repository<System>,
    ) {
    }

    /*
   添加数据
  */
    public async creatSystem(system: CreateSystemDto) {
        try {
            const newSystem = new System();
            newSystem.desc = system.desc;
            newSystem.value = system.value;
            newSystem.crateTime = formatDate();
            newSystem.updateTime = formatDate();
            newSystem.name = system.name;
            return await this.systemRepository.save(newSystem);
        } catch (e) {
            throw new ApiException('添加失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

    /**
     * 更新角色
     * @param role
     */
    public async updateSystem(system: UpdateSystemDto) {
        try {
            return await this.systemRepository
                .createQueryBuilder('s')
                .update(System)
                .set({desc: system.desc, name: system.name, value: system.value,  updateTime: formatDate()})
                .where('id = :id', { id: system.id })
                .execute();
        } catch (e) {
            throw new ApiException('更新失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

    /**
     * 删除角色
     * @param id
     */
    public async deleteSystem(ids: Array<number| string>) {
        try {
            return await this.systemRepository
                .createQueryBuilder()
                .update(System)
                .set({isDelete: 1, deleteTime: formatDate()})
                .whereInIds(ids)
                .execute();
        } catch (e) {
            throw new ApiException('删除失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

    /**
     * 获取角色详情
     * @param query
     */
    public async getSystemInfo(query: string) {
        try {
            return await this.systemRepository
                .createQueryBuilder('s')
                .where('s.id = :id', { id: query})
                .getOne();
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.ROLE_LIST_FAILED, 200);
        }
    }

    /**
     * 校验value的唯一性
     */
    public async checkValue(query: string) {
        try {
            return await this.systemRepository
                .createQueryBuilder('s')
                .where('s.value = :value', { value: query})
                .getOne();
        } catch (e) {
            throw new ApiException('角色已经存在', ApiErrorCode.ROLE_LIST_FAILED, 200);
        }
    }

    /**
     * 查看角色列表
     * @param query
     */
    public async getList(query: QuerySystemDto) {
        try {
            const queryConditionList = ['s.isDelete = :isDelete'];
            if (query.name) {
                queryConditionList.push('s.name LIKE :name');
            }
            const queryCondition = queryConditionList.join(' AND ');
            const res = await this.systemRepository
                .createQueryBuilder('s')
                .where(queryCondition, {
                    name: `${query.name}`,
                    isDelete: 0,
                })
                .orderBy('s.name', 'ASC')
                .addOrderBy('s.value')
                .skip((query.page - 1) * query.pageSize)
                .take(query.pageSize)
                .getManyAndCount();
            return  { data: res[0], count: res[1]};
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.ROLE_LIST_FAILED, 200);
        }
    }

    /**
     * 查询所有角色
     * @param query
     */
    public async getAllList() {
        try {
            const queryConditionList = ['s.isDelete = :isDelete'];
            const queryCondition = queryConditionList.join(' AND ');
            return  await this.systemRepository
                .createQueryBuilder('s')
                .where(queryCondition, {
                    isDelete: 0,
                })
                .orderBy('s.name', 'ASC')
                .addOrderBy('s.value')
                .getMany();
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.ROLE_LIST_FAILED, 200);
        }
    }
}
