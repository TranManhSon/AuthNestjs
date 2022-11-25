// import { User } from './user/users.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { User } from './user/users.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({

  }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: parseInt(process.env.PORT_MYSQL),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: 'test',
    // entities: ["src/**/**.entity{.ts,.js}"],
    entities: [User],
    synchronize: true // warm
  })
    , UsersModule, AuthModule],
  controllers: [AppController]
})
export class AppModule {}
