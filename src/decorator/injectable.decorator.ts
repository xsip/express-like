export function Injectable(): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata('injectable', true, target);
  };
}