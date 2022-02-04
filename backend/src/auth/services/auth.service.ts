import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { format } from 'path/posix';
import { from, map, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
//
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  //
  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 10));
  }
  //
  registerAccount(user: User): Observable<User> {
    const { firstname, lastname, email, password, role } = user;
    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
          }),
        ).pipe(
          map((user: User) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }
}
