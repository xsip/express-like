import {Injectable} from '../decorator/injectable.decorator';

@Injectable()
export class TestInjectable {
  constructor() {
  }

  test() {
    return 'FROM INJECTABLE!';
  }
}