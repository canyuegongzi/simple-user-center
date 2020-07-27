export class KafkaPayload {
  public body: any;
  public messageId: string;
  public messageType: string;
  public topicName: string;
  public createdTime?: string;

  create?(messageId, body, messageType, topicName): KafkaPayload {
    return {
      messageId,
      body,
      messageType,
      topicName,
      createdTime: new Date().toISOString(),
    };
  }
}

// tslint:disable-next-line:max-classes-per-file
export declare class KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId: string;
}
