/*
https://docs.nestjs.com/controllers#controllers
*/
import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getTestHello(): string {
    return this.userService.getTestHello();
  }
  @Get('sec')
  getTestSec(): string {
    return this.userService.getTestSec();
  }
}
