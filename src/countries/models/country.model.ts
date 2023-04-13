import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public areaInKms: number;
}
