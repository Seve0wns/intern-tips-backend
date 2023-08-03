import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.provider';
import { userController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { usersProviders } from './users.providers';

@Module({
  imports: [],
  controllers: [userController],
  providers: [...databaseProviders, ...usersProviders, UserService],
  exports: [UserService, ...usersProviders],
})
export class UserModule {}
