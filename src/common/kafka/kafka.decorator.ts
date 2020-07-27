export const SUBSCRIBER_FN_REF_MAP = new Map();
export const SUBSCRIBER_FIXED_FN_REF_MAP = new Map();
export const SUBSCRIBER_OBJ_REF_MAP = new Map();

export function SubscribeTo(topic) {
  return (target, propertyKey, descriptor) => {
    const originalMethod = target[propertyKey];
    SUBSCRIBER_FN_REF_MAP.set(topic, originalMethod);
    return descriptor;
  };
}
export function SubscribeToFixedGroup(topic) {
  return (target, propertyKey, descriptor) => {
    const originalMethod = target[propertyKey];
    SUBSCRIBER_FIXED_FN_REF_MAP.set(topic, originalMethod);
    return descriptor;
  };
}
