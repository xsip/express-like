
function registerEndpoint(target: NonNullable<unknown>, propertyKey: string | symbol, _path: string, type: 'get' | 'post' ) {
  Reflect.defineMetadata('methods', [...Reflect.getMetadata('methods', target) ?? [], propertyKey], target);
  Reflect.defineMetadata('path', _path, target, propertyKey);
  Reflect.defineMetadata('type', type, target, propertyKey);
}

export function Get(_path: string): MethodDecorator {
  return function (target,propertyKey) {
    registerEndpoint(target, propertyKey, _path, 'get');
    return target;
  }
}
export function Post(_path: string): MethodDecorator {
  return function (target, propertyKey) {
    registerEndpoint(target, propertyKey, _path, 'post');
    return target;
  }
}