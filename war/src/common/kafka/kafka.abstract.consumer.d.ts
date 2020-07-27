/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { EventEmitter } from "events";
export declare abstract class AbstractKafkaConsumer extends EventEmitter implements OnModuleInit {
    constructor();
    protected abstract registerTopic(): any;
    onModuleInit(): Promise<void>;
    protected addTopic(topicName: any): void;
}
