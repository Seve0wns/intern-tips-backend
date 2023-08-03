import { TipEntity } from 'src/tip/entity/tip.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  category: string;

  @OneToMany(() => TipEntity, (tip) => tip.category, { onDelete: 'RESTRICT' })
  tips: TipEntity[];
}
