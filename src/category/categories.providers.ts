import { DataSource } from 'typeorm';
import { CategoryEntity } from './entity/category.entity';

export const categoriesProviders = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoryEntity),
    inject: ['DATA_SOURCE'],
  },
];
