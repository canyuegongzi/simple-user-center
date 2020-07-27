export declare class KafkaPayload {
    body: any;
    messageId: string;
    messageType: string;
    topicName: string;
    createdTime?: string;
    create?(messageId: any, body: any, messageType: any, topicName: any): KafkaPayload;
}
export declare class KafkaConfig {
    clientId: string;
    brokers: string[];
    groupId: string;
}
