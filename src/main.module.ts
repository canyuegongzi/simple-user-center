import {CacheModule, Module} from '@nestjs/common';
import { RedisModule} from 'nestjs-redis';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './module/role.module';
import { OrganizationModule } from './module/organization.module';
import { AuthorityModule } from './module/authority.module';
import {SystemModule} from './module/system.module';
import {Authority} from './model/entity/authority.entity';
import {User} from './model/entity/user.entity';
import {Role} from './model/entity/role.entity';
import {Organization} from './model/entity/organization.entity';
import {System} from './model/entity/system.entity';
import {KafkaTaskModule} from './module/kafkaTask.module';
import {ApiResourceModule} from './module/apiResource.module';
import {ApiResource} from './model/entity/apiResource.entity';
import {RoleApiResourceEntity} from './model/entity/roleApiResource.entity';
import {CommonConfigService} from './service/service/CommonConfigService';
import {CommonConfigKey} from './config/CommonConfigInterface';
const commonConfigService = new CommonConfigService();
console.log(commonConfigService.envConfig);

@Module({
  imports: [
    RedisModule.register({
        name: commonConfigService.get(CommonConfigKey.REDIS_NAME),
        url: commonConfigService.get(CommonConfigKey.REDIS_HOST) + ':' + commonConfigService.get(CommonConfigKey.REDIS_POST),
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
      CacheModule.register({
          store: redisStore,
          host: commonConfigService.get(CommonConfigKey.REDIS_HOST),
          port: commonConfigService.get(CommonConfigKey.REDIS_POST),
          ttl: 30,
          max: 150,
      }),
      UserModule, RoleModule, OrganizationModule, AuthorityModule, SystemModule, KafkaTaskModule, ApiResourceModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class MainModule {}
