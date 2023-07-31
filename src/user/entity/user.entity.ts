import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 12 })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ length: 25 })
  email: string;

  @Column()
  @Transform(({ value }) => Role[value], { toPlainOnly: true })
  role: number;

  constructor(data) {
    this.id = data?.id;
    this.username = data?.username;
    this.email = data?.email;
  }
}
