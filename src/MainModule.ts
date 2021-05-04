import {CacheModule, Module} from '@nestjs/common';
import { RedisModule} from 'nestjs-redis';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { UserModule } from './module/UserModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './module/RoleModule';
import { OrganizationModule } from './module/OrganizationModule';
import { AuthorityModule } from './module/AuthorityModule';
import {SystemModule} from './module/SystemModule';
import {Authority} from './model/entity/AuthorityEntity';
import {User} from './model/entity/UserEntity';
import {Role} from './model/entity/RoleEntity';
import {Organization} from './model/entity/OrganizationEntity';
import {System} from './model/entity/SystemEntity';
import {KafkaTaskModule} from './module/KafkaTaskModule';
import {ApiResourceModule} from './module/ApiResourceModule';
import {ApiResource} from './model/entity/ApiResourceEntity';
import {RoleApiResourceEntity} from './model/entity/RoleApiResourceEntity';
import {CommonConfigService} from './config/CommonConfigService';
import {CommonConfigKey} from './config/CommonConfigInterface';
const commonConfigService = new CommonConfigService();
console.log(commonConfigService.envConfig);

@Module({
  imports: [
    RedisModule.register({
        name: commonConfigService.get(CommonConfigKey.REDIS_NAME),
        host: commonConfigService.get(CommonConfigKey.REDIS_HOST),
        port: commonConfigService.get(CommonConfigKey.REDIS_POST),
        password: commonConfigService.get(CommonConfigKey.REDIS_PASSWORD),
    }),
    TypeOrmModule.forRoot(
        {
          type: 'mysql',
          host: commonConfigService.get(CommonConfigKey.MYSQL),
          port: commonConfigService.get(CommonConfigKey.MYSQL_PORT),
          username: commonConfigService.get(CommonConfigKey.MYSQL_USER),
          password: commonConfigService.get(CommonConfigKey.MYSQL_PASSWORD),
          database: commonConfigService.get(CommonConfigKey.MYSQL_DATABASE_NAME) ,
          entities: [Authority, User, Role, Organization, System, ApiResource, RoleApiResourceEntity],
          synchronize: true,
        },
    ),
    /*  CacheModule.register({
          store: redisStore,
          host: commonConfigService.get(CommonConfigKey.REDIS_HOST),
          port: commonConfigService.get(CommonConfigKey.REDIS_POST),
          password: commonConfigService.get(CommonConfigKey.REDIS_PASSWORD),
          ttl: 30,
          max: 150,
      }),*/
      UserModule, RoleModule, OrganizationModule, AuthorityModule, SystemModule, KafkaTaskModule, ApiResourceModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class MainModule {}
