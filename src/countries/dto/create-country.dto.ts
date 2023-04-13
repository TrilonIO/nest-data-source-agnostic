export class CreateCountryDto {
  constructor(
    public id: string,
    public name: string,
    public areaInKms: number,
  ) {}
}
