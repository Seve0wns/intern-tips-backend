import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.provider';
import { categoriesProviders } from './categories.providers';
import { categoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';

@Module({
  imports: [],
  controllers: [categoryController],
  providers: [...databaseProviders, ...categoriesProviders, CategoryService],
  exports: [...categoriesProviders, CategoryService],
})
export class CategoryModule {}
