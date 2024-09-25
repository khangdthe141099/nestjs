import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductFeature } from './product-feature.entity';
import { User } from './user.entity';
import { ProductType } from './product-type.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(() => ProductFeature, (productFeature) => productFeature.product, {
    cascade: true,
  })
  productFeature: ProductFeature;

  @ManyToOne(() => User, (user) => user.product)
  @JoinColumn({ name: 'ownerId' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedProduct)
  likeBy: User[];

  @ManyToOne(() => ProductType)
  type: ProductType;
}
