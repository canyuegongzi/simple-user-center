import { CreateUserDto } from '../model/DTO/user/creat_user.dto';
import { LoginParamsDto } from '../model/DTO/user/login_params.dto';
import { AuthService } from '../common/auth/auth.service';
import { UserService } from '../service/service/user.service';
import { QueryUserDto } from '../model/DTO/user/query_user.dto';
import { CreateUserRegisterDto } from '../model/DTO/user/creat_user_register.dto';
import { User } from '../model/entity/user.entity';
import { UniqueUser } from '../model/DTO/user/unique_user';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    creatUser(createUserDto: CreateUserDto): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    registerUser(createUserDto: CreateUserRegisterDto): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    login(params: LoginParamsDto, req: any, session: any): Promise<{
        code: number;
        message: string;
        data?: undefined;
        success?: undefined;
    } | {
        code: number;
        message: string;
        data: any;
        success: boolean;
    } | {
        code: number;
        message: string;
        success: boolean;
        data?: undefined;
    }>;
    loginOut(req: any): Promise<{
        code: number;
        message: string;
        success: boolean;
    }>;
    getUserInfo(query: any): Promise<{
        code: number;
        message: string;
        data: any;
    }>;
    getUserInfoByName(query: any): Promise<{
        code: number;
        message: string;
        data: User;
        success: boolean;
    }>;
    getList(params: QueryUserDto): Promise<{
        code: number;
        data: {
            data: User[];
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
        data: {
            data: User[];
            count: number;
        };
        message: string;
    } | {
        code: number;
        data: any[];
        message: string;
    }>;
    getAllListByIds(params: Array<number | string>): Promise<{
        code: number;
        data: User[];
        message: string;
    }>;
    deleteUser(params: Array<string | number>): Promise<{
        code: number;
        message: string;
        success: boolean;
    }>;
    updateUser(createUserDto: CreateUserDto): Promise<{
        code: number;
        message: string;
        success: boolean;
    }>;
    forgetPass(params: string): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    findUserToken(params: string): Promise<{
        code: number;
        data: User;
        message: string;
        success: boolean;
    } | {
        code: number;
        data: any;
        message: any;
        success: boolean;
    }>;
    sendEmailCode(userName: string, email: string): Promise<{
        code: number;
        message: any;
        success: boolean;
    }>;
    verifyEmailCode(email: any, value: any): Promise<boolean | {
        code: number;
        message: any;
        success: boolean;
    }>;
    uniqueUser(params: UniqueUser): Promise<boolean | {
        code: number;
        message: any;
        success: boolean;
    }>;
    faceLogin(params: LoginParamsDto, req: any, session: any): Promise<{
        code: number;
        message: string;
        data?: undefined;
        success?: undefined;
    } | {
        code: number;
        message: string;
        data: any;
        success: boolean;
    } | {
        code: number;
        message: string;
        success: boolean;
        data?: undefined;
    }>;
}
