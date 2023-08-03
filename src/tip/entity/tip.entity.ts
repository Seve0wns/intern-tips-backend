import { CategoryEntity } from 'src/category/entity/category.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tips' })
export class TipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.tips, {
    // eager: true,
    cascade: true,
  })
  author: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.tips, {
    eager: true,
    nullable: false,
    cascade: ['insert'],
  })
  category: CategoryEntity;

  @Column()
  skill: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  video: string;
}
