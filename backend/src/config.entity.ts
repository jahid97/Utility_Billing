import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  rate_per_unit: number;

  @Column('decimal', { precision: 5, scale: 2 })
  vat_percentage: number;

  @Column('decimal', { precision: 10, scale: 2 })
  service_charge: number;
}