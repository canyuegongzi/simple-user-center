import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../../service/service/user.service';
import { User } from '../../model/entity/user.entity';
import {JwtPayloadToken} from './interfaces/jwt-payloadJwtPayload.interfface';

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
    };
  }
}
