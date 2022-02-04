import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    hashPassword(password: string): Observable<string>;
    registerAccount(user: User): Observable<User>;
}
