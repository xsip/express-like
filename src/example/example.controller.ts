import {Controller} from '../decorator/controller.decorator';
import {InjectToken} from '../decorator/token.decorator';
import {Get, Post} from '../decorator/endpoint.decorator';
import {Injector} from '../core/injector';
import {TestInjectable} from './example.injectable';
import {Request} from '../decorator/request.decorator';
import {Response} from '../decorator/response.decorator';
import http from 'http';
import {RequireBody} from '../decorator/require-body.decorator';

@Controller('api')
export class TestController {
  constructor(private ti: TestInjectable,@InjectToken('test') private token: string) {

  }


  @RequireBody()
  @Get('test')
  async test(@Request() _req: http.IncomingMessage, @Response() _res: any) {
    console.log('Hi from controller!', this.token, this.ti.test);
    const res = Injector.getResponse();
    const req = Injector.getRequest();
    const body: any = Injector.getBody();

    return 'TEST';
  }

  @Post('test2')
  async test2() {
    return new Promise((res) => {
      setTimeout(() => {
        res('test2');
      }, 500);
    });
  }
}