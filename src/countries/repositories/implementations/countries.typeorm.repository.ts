import { Country } from '../../models/country.model';
import { CountriesRepository } from '../countries.repository.interface';
import { Repository } from 'typeorm';

export class CountriesTypeOrmRepository implements CountriesRepository {
  constructor(private countriesRepository: Repository<Country>) {}

  async create(country: Country) {
    await this.countriesRepository.insert(country);
    return country;
  }

  async findAll() {
    return this.countriesRepository.find();
  }
}
