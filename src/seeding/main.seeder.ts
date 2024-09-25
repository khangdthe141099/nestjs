import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ProductType } from '../entities/product-type.entity';
import { Product } from '../entities/product.entity';
import { ProductFeature } from '../entities/product-feature.entity';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const typeRepo = dataSource.getRepository(ProductType);

    console.log('seeding PropertyTypes...');
    const propertyTypes = await typeRepo.save([
      { value: 'Condo' },
      { value: 'Apartment' },
    ]);

    const userFactory = factoryManager.get(User);

    console.log('seeding users...');
    const users = await userFactory.saveMany(10);

    const propertyFactory = factoryManager.get(Product);
    const propertyFeatureFactory = factoryManager.get(ProductFeature);

    console.log('seeding properties...');

    const properties = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          const property = await propertyFactory.make({
            user: faker.helpers.arrayElement(users),
            type: faker.helpers.arrayElement(propertyTypes),
            productFeature: await propertyFeatureFactory.save(),
          });
          return property;
        })
    );
    const propertyRepo = dataSource.getRepository(Product);
    await propertyRepo.save(properties);
  }
}
