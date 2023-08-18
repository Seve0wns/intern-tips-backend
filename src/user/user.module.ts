import { forwardRef, Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from 'src/core/auth/auth.guard';
import { AuthModule } from 'src/core/auth/auth.module';
import { databaseProviders } from 'src/core/database/database.provider';
import { userController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { usersProviders } from './users.providers';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [userController],
  providers: [
    ...databaseProviders,
    ...usersProviders,
    UserService,
    // { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [UserService, ...usersProviders],
})
export class UserModule {}
