import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authority } from '../../model/entity/authority.entity';
import {ApiException} from '../../common/error/exceptions/api.exception';
import {ApiErrorCode} from '../../config/api-error-code.enum';
import {Role} from '../../model/entity/role.entity';
import { User } from '../../model/entity/user.entity';

@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(Authority)
        private readonly authorityRepository: Repository<Authority>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    /**
     * 查询当前角色下的权限
     * @param id  角色的id
     */
    public async getUserAuth(id: string | number) {
        try {
            const res = await this.roleRepository
                .createQueryBuilder('r')
                .leftJoinAndSelect('r.authority', 'a')
                .where('r.id = :id', { id})
                .select([
                    'r.name',
                    'r.id',
                    'a',
                ])
                .getManyAndCount();
            return  { data: res[0], count: res[1]};
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.ROLE_LIST_FAILED, 200);
        }
    }

    /**
     * 查询用户信息
     */
    public async getUserInfo(user: User) {
        try {
            const res = await this.userRepository
                .createQueryBuilder('u')
                .leftJoinAndSelect('u.role', 'r')
                .where('u.id = :id', { id: user.id})
                .getOne();
            return res;
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.ROLE_LIST_FAILED, 200);
        }
    }
}
