import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
