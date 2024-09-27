import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/enum/role.enum';

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

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  //One user can have multiple products:
  @OneToMany(() => Product, (product) => product.user)
  product: Product[];

  //One user can like multiple products:
  @ManyToMany(() => Product, (product) => product.likeBy)
  @JoinTable({ name: 'user_liked_product' })
  likedProduct: Product[];

  //Hash password before inserting into the database:
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
