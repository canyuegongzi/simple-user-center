import { AuthService } from './auth.service';
import { JwtPayloadToken } from './interfaces/jwt-payloadJwtPayload.interfface';
declare const AuthStrategy_base: new (...args: any[]) => any;
export declare class AuthStrategy extends AuthStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayloadToken, done: any): Promise<any>;
}
export {};
