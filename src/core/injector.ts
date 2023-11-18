import 'reflect-metadata';
import http from 'http';

export class Injector {
  private static depInstances: Record<string, any> = {};

  static get<T>(target: string | (new (...args: unknown[]) => T)): T {
    if (typeof target === 'string') {
      return this.depInstances[target];
    }

    const dependencies = Reflect.getMetadata("design:paramtypes", target) || [];
    const tokenArgs: { index: number; token: string; }[] = Reflect.getMetadata('tokenArgs', target);
    const instances = dependencies.map((dep: (new (...args: unknown[]) => unknown) | string, idx: number) => {
      const token = tokenArgs.find(t => t.index === idx);
      if (token) {
        if (token.token === 'request')
          return Injector.getRequest();
        if (token.token === 'response')
          return Injector.getRequest();

        return Injector.get(token.token)
      }
      return Injector.get(dep)
    });

    if (Reflect.getMetadata('created', target))
      return Injector.depInstances[target.prototype.name];

    const instance = new target(...instances);
    Reflect.defineMetadata('created', true, target);
    Injector.depInstances[target.prototype.name] = instance as any;
    return instance as T;
  }

  static registerToken<T>(token: string, value: T, override: boolean = true) {
    if (this.depInstances[token] && !override)
      return;
    this.depInstances[token] = value;
  }

  static getRequest(): http.IncomingMessage {
    return Injector.get<http.IncomingMessage>('request');
  }

  static getBody<T>(): T {
    return Injector.get<T>('body');
  }

  static getResponse(): http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage } {
    return Injector.get<http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage }>('response');
  }
}
