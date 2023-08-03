import { Inject, Injectable } from '@nestjs/common';
import { databaseResponse } from 'src/utils/dataBankResponse';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<CategoryEntity>,
  ) {}
  async createCategory(category: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.categoryRepository.insert({ category });
        resolve({ message: 'Category succesfully created' });
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async destroyCategory(id: number) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.categoryRepository.delete(id);
        resolve({ message: 'Category deleted' });
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }

  async getCategoryList(): Promise<CategoryEntity[]> {
    return databaseResponse(async () => {
      return await this.categoryRepository.find();
    });
  }

  async findCategoryById(id: number): Promise<CategoryEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.categoryRepository.findOneBy({ id }));
      } catch (error) {
        reject({ code: error.code, message: error.detail });
      }
    });
  }
}
