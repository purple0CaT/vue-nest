import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/controller/auth.controller';
import { FeedModule } from './feed/feed.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      autoLoadEntities: true,
      synchronize: true, // TURN OF IN PRODUCTION, MAY LOSE DATA
    }),
    UserModule,
    FeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
