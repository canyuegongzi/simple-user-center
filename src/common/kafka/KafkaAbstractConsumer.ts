import { OnModuleInit } from '@nestjs/common';
import { SUBSCRIBER_OBJ_REF_MAP } from './KafkaDecorator';
import {EventEmitter} from "events";

export abstract class AbstractKafkaConsumer extends EventEmitter implements OnModuleInit {

  constructor() {
    super()
  }

  protected abstract registerTopic();

  public async onModuleInit(): Promise<void> {
    this.registerTopic();
  }

  protected addTopic(topicName) {
    SUBSCRIBER_OBJ_REF_MAP.set(topicName, this);
  }
}
