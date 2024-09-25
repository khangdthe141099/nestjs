import { Faker } from '@faker-js/faker';
import { Product } from '../entities/product.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ProductFactory = setSeederFactory(Product, (faker: Faker) => {
  const product = new Product();
  product.name = faker.location.street();
  product.price = faker.number.int({ min: 0, max: 10000 });
  product.description = faker.lorem.sentence();

  return product;
});
