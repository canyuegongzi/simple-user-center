import { DynamicModule, Global, Module } from '@nestjs/common';
import { KafkaService } from './KafkaService';
import { KafkaConfig } from './KafkaMessage';

@Global()
@Module({})
export class KafkaModule {
  static register(kafkaConfig: KafkaConfig): DynamicModule {
    return {
      global: true,
      module: KafkaModule,
      providers: [
        {
          provide: KafkaService,
          useValue: new KafkaService(kafkaConfig),
        },
      ],
      exports: [KafkaService],
    };
  }
}
