import {Body, Controller, Get, Inject, Post, Query, Req, Session, UseInterceptors, HttpCode} from '@nestjs/common';
import { CreateUserDto } from '../model/DTO/user/CreatUserDto';
import { LoginParamsDto } from '../model/DTO/user/LoginParamsDto';
import { AuthService } from '../common/auth/AuthService';
import { UserService } from '../service/UserService';
import { QueryUserDto } from '../model/DTO/user/QueryUserDto';
import {CreateUserRegisterDto} from '../model/DTO/user/CreatUserRegisterDto';
import {User} from '../model/entity/UserEntity';
import {UniqueUser} from '../model/DTO/user/UniqueUser';
import {MessageType, ResultData} from '../common/result/ResultData';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(AuthService) private readonly authService: AuthService,
    ) {}

    /**
     * 用户注册
     * @param createUserDto
     */
    @Post('register')
    public async creatUser(@Body() createUserDto: CreateUserDto) {
        const userInfo: User = await this.userService.findOneByName(createUserDto.name);
        if (userInfo) {
            return new ResultData('用户名被占用', createUserDto, false);
        }
        const userInfoEmail: User = await this.userService.findOneByEmail(createUserDto.email);
        if (userInfoEmail) {
            return new ResultData('邮箱已经存在', createUserDto, false);
        }
        try {
            await this.userService.creatUser(createUserDto);
            return new ResultData('注册成功', createUserDto, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 用户注册
     * @param createUserDto
     */
    @Post('userRegister')
    public async registerUser(@Body() createUserDto: CreateUserRegisterDto) {
        try {
            await this.userService.registerUser(createUserDto);
            return new ResultData('注册成功', createUserDto, true);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 用户登录
     * @param params
     * @param req
     * @param session
     */
    @Post('login')
    public async login(@Body() params: LoginParamsDto, @Req() req, @Session() session) {
        try {
            const res: any = await this.userService.login(params);
            if (res) {
                session.userName = params.name;
                const resToken = await this.authService.creatToken({ name: params.name, userId: res.userId, roleId: res.roleId });
                return new ResultData('登录成功', resToken, true);
            }
            return new ResultData('用户名或者密码错误', {}, false);
        } catch (e) {
            return new ResultData('用户名或者密码错误', {}, false);
        }

    }

    /**
     * 退出登录
     * @param req
     */
    @Post('loginOut')
    public async loginOut(@Req() req) {
        const res = await this.userService.loginOut(req);
        if (res) {
            return new ResultData('操作成功', null, true);
        }
        return new ResultData('操作失败', null, false);
    }

    /**
     * 获取用户信息
     * @param query
     */
    @Get('getUserInfo')
    public async getUserInfo(@Query('id') query: string) {
        const res = await this.userService.getUserInfo(query);
        if (res) {
            return new ResultData(  MessageType.GETINFO, res, true);
        }
        return new ResultData(MessageType.GETINFO, null, false);
    }

    /**
     * 通过用户名称获取用户信息
     * @param query
     */
    @Get('getUserInfoByName')
    public async getUserInfoByName(@Query('name') query) {
        try {
            const res: User = await this.userService.findOneByName(query);
            return new ResultData(MessageType.GETINFO, res, true);
        } catch (e) {
            return new ResultData(MessageType.GETINFO, null, false);
        }
    }

    /**
     * 用户查询
     * @param params
     */
    @Get('list')
    public async getList(@Query() params: QueryUserDto) {
        try {
            const res  = await this.userService.getList(params);
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, { data: [], count: 0}, false);
        }
    }

    /**
     * 查询全部用户
     */
    @Get('all')
    public async getAllList() {
        try {
            const res = await this.userService.getAllList();
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, { data: [], count: 0}, false);
        }
    }

    /**
     * 通过用户id查询用户信息
     * @param params
     */
    @Get('infoByIds')
    public async getAllListByIds(@Query('ids') params: Array<number |string>) {
        try {
            const res = await this.userService.getAllListByIds(params);
            return new ResultData(MessageType.GETLIST, res, true);
        } catch (e) {
            return new ResultData(MessageType.GETLIST, [], false);
        }
    }

    /**
     * 删除用户
     * @param params
     */
    @Post('delete')
    public async deleteUser(@Body('ids') params: Array<string | number>) {
        try {
            await this.userService.deleteUser(params);
            return new ResultData(MessageType.DELETE, null, true);
        } catch (e) {
            return new ResultData(MessageType.DELETE, null, false);
        }
    }

    /**
     * 用户更新
     * @param createUserDto
     */
    @Post('update')
    public async updateUser(@Body() createUserDto: CreateUserDto) {
        try {
            await this.userService.updateUser(createUserDto);
            return new ResultData(MessageType.UPDATE, createUserDto, true);
        } catch (e) {
            return new ResultData(MessageType.UPDATE, null, false);
        }
    }

    /**
     * 忘记密码
     * @param params
     */
    @Post('forgetPass')
    public async forgetPass(@Body('email') params: string) {
        try {
            await this.userService.forgetPass(params);
            return new ResultData(MessageType.UPDATE, null, true);
        } catch (e) {
            return new ResultData(MessageType.UPDATE, null, false);
        }
    }

    /**
     * 通过token获取用户信息
     * @param params
     */
    @Post('findUserToken')
    public async findUserToken(@Body('token') params: string) {
        try {
            let user: User;
            const res = await this.authService.verifyUser(params);
            if (res) {
                user =  await this.userService.findOneByName(res.name);
                return new ResultData(MessageType.GETINFO, this.userService.getTokenUserInfo(user), true);
            } else {
                return new ResultData(MessageType.GETINFO, null, false);
            }
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 获取邮箱验证码
     * @param params
     */
    @Post('getEmailCode')
    public async sendEmailCode(@Body('userName') userName: string, @Body('email') email: string) {
        try {
            await this.userService.sendEmailCode(userName, email );
            return new ResultData(MessageType.GETINFO, null, true);
        } catch (e) {
            return new ResultData(MessageType.GETINFO, null, false);
        }
    }

    /**
     * 获取邮箱验证码
     * @param params
     */
    @Post('verifyCode')
    public async verifyEmailCode(@Body('email') email: any, @Body('value') value: any) {
        try {
            return await this.userService.verifyEmailCode(email, value);
        } catch (e) {
            return new ResultData(e.errorMessage, null, false);
        }
    }

    /**
     * 唯一性验证
     * @param params
     */
    @Post('uniqueUser')
    public async uniqueUser(@Body() params: UniqueUser) {
        return await this.userService.uniqueUser(params);
    }

    /**
     * 脸部登录
     * @param params
     * @param req
     * @param session
     */
    @Post('faceLogin')
    public async faceLogin(@Body() params: LoginParamsDto, @Req() req, @Session() session) {
        try {
            const res: any = await this.userService.faceLogin(params);
            if (res) {
                session.userName = params.name;
                const resToken = await this.authService.creatToken({ name: params.name, userId: res.userId, roleId: res.roleId });
                return new ResultData('登录成功', resToken, true);
            }
            return new ResultData('用户名或者密码错误', {}, false);
        } catch (e) {
            return new ResultData('用户名或者密码错误', {}, false);
        }
    }
}
