import {Controller} from '../decorator/controller.decorator';
import {InjectToken} from '../decorator/token.decorator';
import {Get, Post} from '../decorator/endpoint.decorator';
import {Injector} from '../core/injector';
import {TestInjectable} from './example.injectable';

@Controller('api')
export class TestController {
  constructor(private ti: TestInjectable,@InjectToken('test') private token: string) {

  }

  @Get('test')
  async test() {
    console.log('Hi from controller!', this.token, this.ti.test);
    const res = Injector.getResponse();
    const req = Injector.getRequest();
    const body: any = Injector.getBody();

    return body;
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