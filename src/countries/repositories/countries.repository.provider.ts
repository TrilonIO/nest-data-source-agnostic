import { Injectable, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from '../../data/constants';
import { Repository } from 'typeorm';
import { Country } from '../models/country.model';
import { COUNTRIES_REPOSITORY_TOKEN } from './countries.repository.interface';
import { CountriesInMemoryRepository } from './implementations/countries.in-memory.repository';
import { CountriesTypeOrmRepository } from './implementations/countries.typeorm.repository';

export function provideCountriesRepository(): Provider[] {
  return [
    {
      provide: COUNTRIES_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: CountriesRepoDependenciesProvider,
      ) => provideCountriesRepositoryFactory(dependenciesProvider),
      inject: [CountriesRepoDependenciesProvider],
    },
    CountriesRepoDependenciesProvider,
  ];
}

async function provideCountriesRepositoryFactory(
  dependenciesProvider: CountriesRepoDependenciesProvider,
) {
  await ConfigModule.envVariablesLoaded;

  switch (process.env.COUNTRIES_DATASOURCE) {
    case DataSource.TYPEORM:
      return new CountriesTypeOrmRepository(
        dependenciesProvider.typeOrmRepository,
      );
    case DataSource.MEMORY:
    default:
      return new CountriesInMemoryRepository();
  }
}

@Injectable()
export class CountriesRepoDependenciesProvider {
  constructor(
    @InjectRepository(Country)
    public typeOrmRepository: Repository<Country>,
  ) {}
}
