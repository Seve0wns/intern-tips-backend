import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwtAuth.guard';
import { CategoryCreationDto } from '../dto/category.dto';
import { CategoryDeleteDto } from '../dto/categoryParams.dto';
import { CategoryService } from '../service/category.service';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class categoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() newCategory: CategoryCreationDto, @Req() req) {
    if (req.user?.role == 'manager' || req.user?.role == 'root') {
      return await this.categoryService.createCategory(newCategory.category);
    }
  }
  @Delete(':id')
  public async destroy(@Param() category: CategoryDeleteDto, @Req() req) {
    if (req.user?.role == 'manager' || req.user?.role == 'root') {
      return await this.categoryService.destroyCategory(category.id);
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll() {
    return await this.categoryService.getCategoryList();
  }
}
