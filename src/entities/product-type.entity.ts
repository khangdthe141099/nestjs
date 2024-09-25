import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}
