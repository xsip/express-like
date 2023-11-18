import {Injector} from '../core/injector';

export function RequireBody():MethodDecorator {
  return (target, propertyKey, descriptor) => {
    // @ts-ignore
    const originalMethod: any = descriptor[propertyKey];
    // @ts-ignore
    descriptor[propertyKey] = function (...args: any[]) {
      const req = Injector.getRequest();
      const body = Injector.getBody();
      if(!body)
        return 'Missing Body';
      // @ts-ignore
      return originalMethod.apply(this, args);
    } as any;
  };
};