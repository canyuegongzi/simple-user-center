import { DynamicModule } from '@nestjs/common';
import { KafkaConfig } from './kafka.message';
export declare class KafkaModule {
    static register(kafkaConfig: KafkaConfig): DynamicModule;
}
