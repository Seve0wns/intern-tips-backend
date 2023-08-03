import { DataSource } from 'typeorm';
import { TipEntity } from './entity/tip.entity';

export const TipsProviders = [
  {
    provide: 'TIP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TipEntity),
    inject: ['DATA_SOURCE'],
  },
];
