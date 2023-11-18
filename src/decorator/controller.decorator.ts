import {Injector} from '../core/injector';
import {Injectable} from './injectable.decorator';

export function Controller(mainPath: string): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata('controller', true, target);
    Reflect.defineMetadata('injectable', true, target);
    Reflect.defineMetadata('mainPath', mainPath, target.prototype);
    Reflect.defineMetadata('name', target.name, target);
    return target;
  }
}



