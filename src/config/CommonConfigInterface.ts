// 动态配置接口定义
export interface CommonConfigInterface {
    // mysql 地址
    MYSQL: string;
    // mysql 密码
    MYSQL_PASSWORD: string;
    // mysql 用户
    MYSQL_USER: string;
    // mysql 数据库名称
    MYSQL_DATABASE_NAME: string;
    // mysql 端口
    MYSQL_PORT: any;
    // mongodb 地址
    MONGODB: string;
    // mongodb 密码
    MONGODB_PASSWORD: string;
    // mongodb 鉴权用户
    MONGODB_USER: string;
    // mongodb 数据库名
    MONGODB_DATABASE_NAME: string;
    // mongodb 端口名
    MONGODB_PORT: any;
    // mongodb 鉴权库名
    MONGODB_AUTH_SOURCE: any;
    // redis 地址
    REDIS: string;
    // redis 连接名
    REDIS_NAME: string;
    // redis ip 地址
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    // redis 端口
    REDIS_POST: string;
    // kafka 地址
    KAfKA: string;
    RABBITMQ: string;
    // RABBITMQ 地址
    [key: string]: string;
}
// 定义系统中需要的配置信息唯一标识
export const CommonConfigKey: CommonConfigInterface = {
    MYSQL: 'MYSQL',
    MYSQL_PASSWORD: 'MYSQL_PASSWORD',
    MYSQL_USER: 'MYSQL_USER',
    MYSQL_DATABASE_NAME: 'MYSQL_DATABASE_NAME',
    MYSQL_PORT: 'MYSQL_PORT',
    MONGODB: 'MONGODB',
    MONGODB_PASSWORD: 'MONGODB_PASSWORD',
    MONGODB_USER: 'MONGODB_USER',
    MONGODB_DATABASE_NAME: 'MONGODB_DATABASE_NAME',
    MONGODB_PORT: 'MONGODB_PORT',
    MONGODB_AUTH_SOURCE: 'MONGODB_AUTH_SOURCE',
    REDIS: 'REDIS',
    REDIS_NAME: 'REDIS_NAME',
    REDIS_HOST: 'REDIS_HOST',
    REDIS_POST: 'REDIS_POST',
    REDIS_PASSWORD: 'REDIS_PASSWORD',
    KAfKA: 'KAfKA',
    RABBITMQ: 'RABBITMQ',
};
