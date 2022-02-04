/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getTestHello(): string {
    return 'Test Hello World!';
  }
  getTestSec(): string {
    return 'test2';
  }
}
