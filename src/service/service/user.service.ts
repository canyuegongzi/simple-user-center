import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../model/DTO/user/creat_user.dto';
import { LoginParamsDto } from '../../model/DTO/user/login_params.dto';
import {Role} from '../../model/entity/role.entity';
import {QueryUserDto} from '../../model/DTO/user/query_user.dto';
import {ApiException} from '../../common/error/exceptions/api.exception';
import {ApiErrorCode} from '../../config/api-error-code.enum';
import {User} from '../../model/entity/user.entity';
import {formatDate} from '../../utils/data-time';
import {emailConfig} from '../../config/config';
import {CreateUserRegisterDto} from '../../model/DTO/user/creat_user_register.dto';
// tslint:disable-next-line:no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class UserService {
  private transporter: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
  }

  /**
   * 创建用户
   * @param user
   */
  public async creatUser(user: CreateUserDto) {
    try {
      let role: Role;
      try {
        role =  await this.roleRepository
            .createQueryBuilder('r')
            .where('r.id = :id', { id: user.roleId || 0})
            .getOne();
      } catch (e) {
        throw new ApiException('角色不存在', ApiErrorCode.USER_LIST_FILED, 200);
      }
      try {
        return await this.userRepository
            .createQueryBuilder('u')
            .insert()
            .into(User)
            .values([ {
              crateTime: formatDate(),
              updateTime: formatDate(),
              password: user.password,
              name: user.name,
              desc: user.desc,
              role,
              email: user.email,
              nick: user.nick,
              address: user.address,
              age: user.age,
            }])
            .execute();
      } catch (e) {
        throw new ApiException('注册失败', ApiErrorCode.USER_LIST_FILED, 200);
      }
    } catch (e) {
      throw new ApiException('注册失败', ApiErrorCode.USER_LIST_FILED, 200);
    }
  }

    /**
     * 用户注册
     * @param user
     */
  public async registerUser(user: CreateUserRegisterDto) {
      try {
          let role: Role;
          try {
              role =  await this.roleRepository
                  .createQueryBuilder('r')
                  .where('r.name = :name', { name: 'user'})
                  .getOne();
          } catch (e) {
              throw new ApiException('角色不存在', ApiErrorCode.USER_LIST_FILED, 200);
          }
          try {
              return await this.userRepository
                  .createQueryBuilder('u')
                  .insert()
                  .into(User)
                  .values([ {
                      crateTime: formatDate(),
                      updateTime: formatDate(),
                      password: user.password,
                      name: user.name,
                      role,
                      email: user.email,
                      nick: user.nick,
                  }])
                  .execute();
          } catch (e) {
              throw new ApiException('注册失败', ApiErrorCode.USER_LIST_FILED, 200);
          }
      } catch (e) {
          throw new ApiException('注册失败', ApiErrorCode.USER_LIST_FILED, 200);
      }
  }
  /**
   * 用户登录
   * @param params
   */
  public async login(params: LoginParamsDto) {
    try {
      const res =  await this.userRepository
        .createQueryBuilder('u')
        .where('u.name = :name', { name: params.name})
        .andWhere('u.password = :password', { password: params.password})
        .getOne();
      if (res) {
        return res;
      } else {
        return false;
      }
    } catch (e) {
      return await e;
    }
  }

  /**
   * 退出登录
   * @param req
   */
  public async loginOut(req) {
    try {
      req.session.userName = null; // 删除session
      return true;
    } catch (e) {
      return await e;
    }
  }

  /**
   * 查询用户的信息
   * @param query
   */
  public async getUserInfo(query: string) {
    try {
      const res = await this.userRepository
        .createQueryBuilder('u')
        .where('u.id = :id', { id: query})
        .leftJoinAndSelect('u.role', 'role')
        .select([
            'u',
            'role.name',
            'role.id',
            'u.email',
            'u.password',
        ])
        .getOne();
      if (await res) {
        return {data: res, flag: true};
      } else {
        return {data: res, flag: false};
      }
    } catch (e) {
      return e;
    }
  }

  /**
   * 通过用户名查看
   * @param name
   */
  public async findOneByName(name: string): Promise<User> {
      try {
          return await this.userRepository.findOne({ name });
      } catch (e) {
          throw new ApiException('查询失败', ApiErrorCode.USER_LIST_FILED, 200);
      }
  }

  /**
   * 通过邮件查看
   * @param name
   */
  public async findOneByEmail(email: string): Promise<User> {
      try {
          return await this.userRepository.findOne({ email });
      } catch (e) {
          throw new ApiException('查询失败', ApiErrorCode.USER_LIST_FILED, 200);
      }

  }

  /**
   * 查询用户列表
   * @param query
   */
   public async getList(query: QueryUserDto) {
        try {
          const queryConditionList = ['u.isDelete = :isDelete'];
          const leftJoinConditionList = [];
          let leftJoinConditionOrganizations = {};
          if (query.roleId) {
            queryConditionList.push('u.roleId = :roleId');
          }
          if (query.name) {
            queryConditionList.push('u.name LIKE :name');
          }
          if (query.email) {
            queryConditionList.push('u.email = :email');
          }
          if (query.nick) {
            queryConditionList.push('u.nick LIKE :nick');
          }
          if (query.startAge) {
            queryConditionList.push('u.age >= :startAge');
          }
          if (query.endAge) {
            queryConditionList.push('u.age <= :endAge');
          }
          if (query.orgId) {
            leftJoinConditionList.push('org.id = :id');
            queryConditionList.push('org.id = :organizationId');
            leftJoinConditionOrganizations = {id: query.orgId};
          }
          const queryCondition = queryConditionList.join(' AND ');
          const leftJoinCondition = leftJoinConditionList.join('');
          const res = await this.userRepository
                .createQueryBuilder('u')
                .leftJoinAndSelect('u.role', 'r')
                .leftJoinAndSelect('u.organizations', 'org', leftJoinCondition, leftJoinConditionOrganizations )
                .where(queryCondition, {
                                                      name: `%${query.name}%`,
                                                      nick: `%${query.nick}%`,
                                                      roleId: query.roleId,
                                                      isDelete: query.isDel ? query.isDel : 0,
                                                      organizationId: query.orgId,
                                                      email: query.email,
                                                      startAge: Number(query.startAge),
                                                      endAge: Number(query.endAge),
                })
                .orderBy('u.name', 'ASC')
                .addSelect(['u.email'])
                .skip((query.page - 1) * query.pageSize)
                .take(query.pageSize)
                .getManyAndCount();
          return  { data: res[0], count: res[1]};
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

    /**
     * 查询用户列表
     * @param query
     */
    public async getAllList() {
        try {
            const queryConditionList = ['u.isDelete = :isDelete'];
            const leftJoinConditionList = [];
            const queryCondition = queryConditionList.join(' AND ');
            const res = await this.userRepository
                .createQueryBuilder('u')
                .where(queryCondition, {
                    isDelete: 0,
                })
                .orderBy('u.name', 'ASC')
                .getManyAndCount();
            return  { data: res[0], count: res[1]};
        } catch (e) {
            throw new ApiException('查询失败', ApiErrorCode.USER_LIST_FILED, 200);
        }
    }

  /**
   * 删除用户
   * @param params
   */
  public async deleteUser(params: Array<string | number>) {
    try {
      return await this.userRepository
          .createQueryBuilder('u')
          .update(User)
          .set({isDelete: 1, deleteTime: formatDate()})
          .whereInIds(params)
          .execute();
    } catch (e) {
      throw new ApiException('删除失败', ApiErrorCode.USER_LIST_FILED, 200);
    }
  }

  /**
   * 更新用户
   * @param createUserDto
   */
  public async updateUser(createUserDto: CreateUserDto) {
      try {
        let role: Role;
        try {
          role = await this.roleRepository
              .createQueryBuilder('r')
              .where('r.id = :id', { id: createUserDto.roleId || 0})
              .getOne();
        } catch (e) {
          throw new ApiException('角色不存在', ApiErrorCode.USER_LIST_FILED, 200);
        }
        return this.roleRepository
            .createQueryBuilder('u')
            .update(User)
            .set({desc: createUserDto.desc, nick: createUserDto.nick, name: createUserDto.name,
              password: createUserDto.password, role, address: createUserDto.address,
              email: createUserDto.email, age: createUserDto.age, updateTime: formatDate() })
            .where('id = :id', { id: createUserDto.id })
            .execute();
      } catch (e) {
        throw new ApiException('更新失败', ApiErrorCode.USER_LIST_FILED, 200);
      }
  }

  /**
   * 忘记密码
   * @param params
   */
  public async forgetPass(params: string) {
      try {
          let user: User;
          const queryConditionList = ['u.isDelete = :isDelete', 'u.email = :email'];
          const queryCondition = queryConditionList.join(' AND ');
          try {
              user = await this.userRepository
                  .createQueryBuilder('u')
                  .where(queryCondition, {
                      isDelete: 0,
                      email: params,
                  })
                  .orderBy('u.name', 'ASC')
                  .addSelect('u.password')
                  .getOne();
          } catch (e) {
              throw new ApiException('邮箱不存在', ApiErrorCode.USER_LIST_FILED, 200);
          }
          console.log(user)
          if (!user) {
              throw new ApiException('用户不存在', ApiErrorCode.USER_LIST_FILED, 200);
          }
          const mailOptions = {
              from: emailConfig.fromUser, // sender address
              to: params, // list of receivers
              subject: '密码', // Subject line
              html: '<p>密码查询</p><p>用户名：' + user.name + '</p><p>密码：' + user.password + '</p>', // html body
          };
          try {
              const sendEmailResult = await this.sendMailer(mailOptions);
              return { success: true, data: sendEmailResult, message: '发送成功', code: 200};
          } catch (e) {
              console.log(e);
              throw new ApiException(e.message, ApiErrorCode.USER_LIST_FILED, 200);
          }
      } catch (e) {
          console.log(e);
          throw new ApiException(e.errorMessage, ApiErrorCode.USER_LIST_FILED, 200);
      }
  }

  /**
   * 发送邮件
   */
  private sendMailer(mailOptions: any) {
      let transporter: any = null;
      return new Promise((resolve, reject) => {
          try {
              transporter = nodemailer.createTransport({
                  // host: 'smtp.ethereal.email',
                  service: 'QQ', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
                  port: 465, // SMTP 端口
                  secureConnection: false, // 使用了 SSL
                  auth: {
                      user: emailConfig.user,
                      pass: emailConfig.authPass,
                      // pass: 'mlemxnogjqcfecba',
                  },
              });
          } catch (e) {
              reject(e);
          }
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log(error);
                  reject(error);
              }
              resolve(true);
              console.log('Message sent: %s', info.messageId);
          });
      });
  }
}
