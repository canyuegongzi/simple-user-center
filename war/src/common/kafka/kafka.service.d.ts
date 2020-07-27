import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { KafkaConfig, KafkaPayload } from './kafka.message';
export declare class KafkaService implements OnModuleInit, OnModuleDestroy {
    private kafkaConfig;
    private kafka;
    private producer;
    private consumer;
    private fixedConsumer;
    private readonly consumerSuffix;
    constructor(kafkaConfig: KafkaConfig);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    bindAllTopicToConsumer(callback: any, _topic: any): Promise<void>;
    bindAllTopicToFixedConsumer(callback: any, _topic: any): Promise<void>;
    sendMessage(kafkaTopic: string, kafkaMessage: KafkaPayload): Promise<void | import("kafkajs").RecordMetadata[]>;
}
