import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  avatarUrl: string;

  @CreateDateColumn()
  createAt: Date;

  //One user can have multiple products:
  @OneToMany(() => Product, (product) => product.user)
  product: Product[];

  //One user can like multiple products:
  @ManyToMany(() => Product, (product) => product.likeBy)
  @JoinTable({ name: 'user_liked_product' })
  likedProduct: Product[];
}
