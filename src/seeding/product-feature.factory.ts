import { Faker } from '@faker-js/faker';
import { ProductFeature } from '../entities/product-feature.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ProductFeatureFactory = setSeederFactory(ProductFeature, (faker: Faker) => {
  const productFeature = new ProductFeature();
  productFeature.image = faker.image.avatar();
  productFeature.discount = faker.number.int({ min: 1, max: 1000 });
  productFeature.rating = faker.number.int({ min: 1, max: 5 });
  productFeature.quantity = faker.number.int({ min: 1, max: 1000 });

  return productFeature;
});
