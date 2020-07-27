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
import {mysqlConfig, redisCacheConfig, redisConfig} from './config/config';
import {Authority} from './model/entity/authority.entity';
import {User} from './model/entity/user.entity';
import {Role} from './model/entity/role.entity';
import {Organization} from './model/entity/organization.entity';
import {System} from './model/entity/system.entity';
import {KafkaTaskModule} from './module/kafkaTask.module';

@Module({
  imports: [
    RedisModule.register(redisConfig),
    TypeOrmModule.forRoot(
        {
          type: 'mysql',
          host: mysqlConfig.host,
          port: 7000,
          username: mysqlConfig.userName,
          password: mysqlConfig.password,
          database: 'b_simple_user_center',
          entities: [Authority, User, Role, Organization, System],
          synchronize: true,
        },
    ),
      CacheModule.register({
          store: redisStore,
          host: redisCacheConfig.host,
          port: redisCacheConfig.port,
          ttl: redisCacheConfig.ttl, // seconds
          max: redisCacheConfig.max, // seconds
      }),
      UserModule, RoleModule, OrganizationModule, AuthorityModule, SystemModule, KafkaTaskModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class MainModule {}
