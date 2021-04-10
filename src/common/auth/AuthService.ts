import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/JwtPayloadInterface';
import { UserService } from '../../service/UserService';
import { User } from '../../model/entity/UserEntity';
import {JwtPayloadToken} from './interfaces/JwtPayloadJwtPayloadInterfface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: JwtPayload): Promise<string> {
    return this.jwtService.sign(user);
  }

  /**
   * 用户验证
   * @param user
   */
  async validateUser(user: JwtPayloadToken): Promise<User> {
    return await this.userService.findOneByName(user.name);
  }

  /**
   * 核查用户
   * @param token
   */
  async verifyUser(token: string) {
    return await this.jwtService.verify(token);
  }

  /**
   * 产生token
   * @param user
   */
  async creatToken(user: JwtPayloadToken): Promise<any> {
    const expiration = 60 * 60;
    const accessToken = await this.jwtService.sign(user, {
      expiresIn: expiration,
    });
    return {
      expiration,
      accessToken,
      success: true,
    };
  }
}
