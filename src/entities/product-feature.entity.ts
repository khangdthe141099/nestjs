import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  discount: number;

  @Column()
  rating: number;

  @Column()
  quantity: number;

  @OneToOne(() => Product, (product) => product.productFeature)
  @JoinColumn()
  product: Product;

  //   @Column()
  //   comment: string;

  //   @Column()
  //   type: string[];
}
