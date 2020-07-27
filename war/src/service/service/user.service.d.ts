import { Repository } from 'typeorm';
import { CreateUserDto } from '../../model/DTO/user/creat_user.dto';
import { LoginParamsDto } from '../../model/DTO/user/login_params.dto';
import { Role } from '../../model/entity/role.entity';
import { QueryUserDto } from '../../model/DTO/user/query_user.dto';
import { User } from '../../model/entity/user.entity';
import { CreateUserRegisterDto } from '../../model/DTO/user/creat_user_register.dto';
import { RedisCacheService } from './redisCache.service';
import { UniqueUser } from '../../model/DTO/user/unique_user';
export declare class UserService {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly redisCacheService;
    private transporter;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, redisCacheService: RedisCacheService);
    creatUser(user: CreateUserDto): Promise<import("typeorm").InsertResult>;
    registerUser(user: CreateUserRegisterDto): Promise<import("typeorm").InsertResult>;
    login(params: LoginParamsDto): Promise<any>;
    loginOut(req: any): Promise<any>;
    getUserInfo(query: string): Promise<any>;
    findOneByName(name: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    getList(query: QueryUserDto): Promise<{
        data: User[];
        count: number;
    }>;
    getAllList(): Promise<{
        data: User[];
        count: number;
    }>;
    getAllListByIds(ids: Array<number | string>): Promise<User[]>;
    deleteUser(params: Array<string | number>): Promise<import("typeorm").UpdateResult>;
    updateUser(createUserDto: CreateUserDto): Promise<import("typeorm").UpdateResult>;
    forgetPass(params: string): Promise<{
        success: boolean;
        data: {};
        message: string;
        code: number;
    }>;
    private sendMailer;
    sendEmailCode(userName: string, email: string): Promise<{
        success: boolean;
        data: {};
        message: string;
        code: number;
    }>;
    verifyEmailCode(email: any, value: any): Promise<boolean>;
    faceLogin(params: LoginParamsDto): Promise<void>;
    protected makCode(): string;
    uniqueUser(params: UniqueUser): Promise<boolean>;
}
