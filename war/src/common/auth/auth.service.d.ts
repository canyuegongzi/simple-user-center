import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../../service/service/user.service';
import { User } from '../../model/entity/user.entity';
import { JwtPayloadToken } from './interfaces/jwt-payloadJwtPayload.interfface';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(user: JwtPayload): Promise<string>;
    validateUser(user: JwtPayloadToken): Promise<User>;
    verifyUser(token: string): Promise<any>;
    creatToken(user: JwtPayloadToken): Promise<any>;
}
