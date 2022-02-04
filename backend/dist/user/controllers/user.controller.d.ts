import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getTestHello(): string;
    getTestSec(): string;
}
