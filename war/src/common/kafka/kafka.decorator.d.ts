export declare const SUBSCRIBER_FN_REF_MAP: Map<any, any>;
export declare const SUBSCRIBER_FIXED_FN_REF_MAP: Map<any, any>;
export declare const SUBSCRIBER_OBJ_REF_MAP: Map<any, any>;
export declare function SubscribeTo(topic: any): (target: any, propertyKey: any, descriptor: any) => any;
export declare function SubscribeToFixedGroup(topic: any): (target: any, propertyKey: any, descriptor: any) => any;
