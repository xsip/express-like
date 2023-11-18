import 'reflect-metadata';
import {Server} from './server/server';
import {Injector} from './core/injector';
import {TestController} from './example/example.controller';


Injector.registerToken('test', 12345);

const server = new Server();
server.listen(
  [TestController],
  1234,
  (msg) => {
    console.log(msg);
  });