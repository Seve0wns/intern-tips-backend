import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryCreationDto } from '../dto/category.dto';
import { CategoryDeleteDto } from '../dto/categoryParams.dto';
import { CategoryService } from '../service/category.service';

@Controller('categories')
export class categoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() newCategory: CategoryCreationDto) {
    return await this.categoryService.createCategory(newCategory.category);
  }
  @Delete(':id')
  public async destroy(@Param() category: CategoryDeleteDto) {
    return await this.categoryService.destroyCategory(category.id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll() {
    return await this.categoryService.getCategoryList();
  }
}
