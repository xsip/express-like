import 'reflect-metadata';
import http from 'http';
import {addGetEndpoint, addPostEndpoint, routes} from './endpoint.creator';
import {UrlMatcher} from './url.matcher';
import {Injector} from '../core/injector';

interface Controller {
  new(...args: any[]): any;
}

export class Server {
  _server: ReturnType<typeof http.createServer>;

  constructor() {
    this._server = http.createServer(async (req, res) => {
      for (const index in routes) {
        if (UrlMatcher.isMatching(req.url, routes[index].route)) {
          if (req.method === routes[index].method) {
            Injector.registerToken('request', req);
            Injector.registerToken('response', res);
            Injector.registerToken('body', await this.getBody(req));
            // console.log(routes[index].controller.prototype[routes[index].fnName], );
            const tokenArgs: {index: number; token: string;}[] = Reflect.getMetadata('tokenArgs',routes[index].controller.prototype,routes[index].fnName)
            const dependencies = Reflect.getMetadata("design:paramtypes", routes[index].controller.prototype,routes[index].fnName) || [];
            const instances = dependencies.map((dep: (new (...args: unknown[])=> unknown) | string, idx: number) => {
              const token = tokenArgs.find(t => t.index === idx);
              if(token) {
                if(token.token === 'request')
                  return Injector.getRequest();
                if(token.token === 'response')
                  return Injector.getResponse();

                return Injector.get(token.token)
              }
              return Injector.get(dep)
            });
            const result = await routes[index].callback(...instances);
            res.writeHead(200, {'Content-Type': typeof res === 'object' ? 'application/json': 'text/plain'});
            res.write(result);
            res.end();
            break;
          }
        }
      }
    })
  }

  listen(controllers: Controller[], port: number, cb: (message: string) => void) {
    try {
      for (const controller of controllers) {
        if (Reflect.getMetadata('controller', controller)) {
          this.createControllerInstance(controller);
        } else {
          console.log(`${controller.name} is not a controller!!`);
        }
      }
      const run = this._server.listen(port)
      cb(`Server running on port ${port}`)
    } catch (e) {
      console.log(e);
      cb('error occured while starting server. ')
    }
  }

  private createControllerInstance(controller: Controller) {
    const controllerInstance = Injector.get(controller);
    console.log(controllerInstance)
    const propertyKeys: string[] = Reflect.getMetadata('methods', controller.prototype);
    const mainPath: string = Reflect.getMetadata('mainPath', controller.prototype);
    for(const propertyKey of propertyKeys) {
      const endpointType: string = Reflect.getMetadata('type', controller.prototype,propertyKey);
      const endpointPath: string = Reflect.getMetadata('path', controller.prototype, propertyKey);
      console.log('Registering ',propertyKey,endpointType,mainPath,endpointPath);
      if(endpointType === 'get') {
        addGetEndpoint(controller,propertyKey,`/${mainPath}/${endpointPath}`,controller.prototype[propertyKey].bind(controllerInstance));
      } else {
        addPostEndpoint(`/${mainPath}/${endpointPath}`,controller.prototype[propertyKey].bind(controllerInstance));
      }
    }


  }

  getBody<T>(request: http.IncomingMessage): Promise<T> {
    return new Promise((resolve) => {
      const bodyParts: any[] = [];
      let body;
      request.on('data', (chunk) => {
        bodyParts.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(bodyParts).toString();
        resolve(body as T)
      });
    });
  }

}