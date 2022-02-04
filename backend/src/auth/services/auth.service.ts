import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
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
  //  Login
  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne(
        { email },
        {
          select: ['id', 'firstname', 'lastname', 'email', 'password', 'role'],
        },
      ),
    ).pipe(
      switchMap((user: User) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        ),
      ),
    );
  }
  //
  loginUser(user: User): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          // create JWT credentials
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
}
