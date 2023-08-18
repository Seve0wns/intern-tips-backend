import { Exclude, Transform } from 'class-transformer';
import { TipEntity } from 'src/tip/entity/tip.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  username: string;

  @OneToMany(() => TipEntity, (tip) => tip.author)
  tips: TipEntity[];

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string;

  @Column({ length: 25, unique: true })
  email: string;

  @Column()
  @Transform(({ value }) => Role[value], { toPlainOnly: true })
  role: number;

  async checkPassword(password: string): Promise<boolean> {
    // console.log(password);
    // console.log(this);
    return this.password === (await bcrypt.hash(password, this.salt));
  }
}
