import { Module } from '@nestjs/common';
import { RedisModule} from 'nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './module/role.module';
import { OrganizationModule } from './module/organization.module';
import { AuthorityModule } from './module/authority.module';
import {ConfigModule} from './module/config.module';
import {join} from 'path';
import {SystemModule} from './module/system.module';
import {mysqlConfig} from './config/config';

@Module({
  imports: [
    // RedisModule.register(redisConfig),
    TypeOrmModule.forRoot(
        {
          type: 'mysql',
          host: mysqlConfig.host,
          port: 3306,
          username: mysqlConfig.userName,
          password: mysqlConfig.password,
          database: 'b_simple_user_center',
          entities: [join(__dirname, '**/**.entity{.ts,.js}')],
          synchronize: true,
        },
    ), UserModule, RoleModule, OrganizationModule, AuthorityModule, SystemModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class MainModule {}
