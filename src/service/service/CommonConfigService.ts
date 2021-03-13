import {mongodbConfig, redisConfig, mysqlConfig, rabbitMQConfig, kafkaConfig} from '../../config/config.json';
import {CommonConfigInterface} from '../../config/CommonConfigInterface';

export class CommonConfigService {
    public readonly envConfig: CommonConfigInterface;
    private readonly processEnv: CommonConfigInterface;
    constructor() {
        this.processEnv = process.env as CommonConfigInterface;
        console.log(this.processEnv);
        this.envConfig = this.initEnvConfig(this.processEnv);
    }

    public get(key: string): any {
        return this.envConfig[key];
    }

    /**
     * 初始化配置
     * @param autoConfig<CommonConfigInterface> 默认环境变量
     * @return config<CommonConfigInterface>
     */
    private initEnvConfig(autoConfig: CommonConfigInterface): CommonConfigInterface {
        return {
            MYSQL: autoConfig.MYSQL || mysqlConfig.host,
            MYSQL_DATABASE_NAME: autoConfig.MYSQL_DATABASE_NAME || mysqlConfig.dataBaseName,
            MYSQL_PASSWORD: autoConfig.MYSQL_PASSWORD || mysqlConfig.password,
            MYSQL_USER: autoConfig.MYSQL_USER || mysqlConfig.userName,
            MYSQL_PORT: autoConfig.MYSQL_PORT || mysqlConfig.port,
            MONGODB: autoConfig.MONGODB || mongodbConfig.host,
            MONGODB_DATABASE_NAME: autoConfig.MONGODB_DATABASE_NAME || mongodbConfig.dataBaseName,
            MONGODB_PASSWORD: autoConfig.MONGODB_PASSWORD || mongodbConfig.password,
            MONGODB_PORT: autoConfig.MONGODB_PORT || mongodbConfig.port,
            MONGODB_USER: autoConfig.MONGODB_USER || mongodbConfig.userName,
            MONGODB_AUTH_SOURCE: autoConfig.MONGODB_AUTH_SOURCE || mongodbConfig.authSource,
            RABBITMQ: autoConfig.RABBITMQ || rabbitMQConfig.url,
            REDIS: autoConfig.REDIS || redisConfig.url,
            REDIS_NAME: autoConfig.REDIS_NAME || redisConfig.name,
            REDIS_POST: autoConfig.REDIS_POST || redisConfig.port,
            REDIS_HOST: autoConfig.REDIS_HOST || redisConfig.host,
            KAfKA: autoConfig.KAfKA || kafkaConfig.url,
        } as CommonConfigInterface;
    }
}
