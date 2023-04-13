import { Inject, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import {
  CountriesRepository,
  COUNTRIES_REPOSITORY_TOKEN,
} from './repositories/countries.repository.interface';

@Injectable()
export class CountriesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY_TOKEN)
    private countriesRepository: CountriesRepository,
  ) {}

  create(countryDto: CreateCountryDto) {
    return this.countriesRepository.create(countryDto);
  }

  findAll() {
    return this.countriesRepository.findAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} country`;
  }

  update(id: string, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: string) {
    return `This action removes a #${id} country`;
  }
}
