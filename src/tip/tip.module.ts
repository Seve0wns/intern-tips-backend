import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { databaseProviders } from 'src/core/database/database.provider';
import { UserModule } from 'src/user/user.module';
import { tipController } from './controller/tip.controller';
import { TipService } from './service/tip.service';
import { TipsProviders } from './tips.providers';

@Module({
  imports: [UserModule, CategoryModule],
  controllers: [tipController],
  providers: [...databaseProviders, ...TipsProviders, TipService],
})
export class TipModule {}
