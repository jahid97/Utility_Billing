import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuration } from './config.entity';
import { UpdateConfigDto } from './dtos';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Configuration)
    private configRepo: Repository<Configuration>,
  ) {}

  // get the recent configuration
  async getConfig(): Promise<Configuration> {
    const config = await this.configRepo.find({
      order: { id: 'DESC' },
      take: 1,
    });
    return config[0];
  }

  // update configuration for admin
  async updateConfig(dto: UpdateConfigDto): Promise<Configuration> {
    const newConfig = this.configRepo.create(dto);
    return await this.configRepo.save(newConfig);
  }

  // calculate bill 
  async calculateBill(units: number) {
    const config = await this.getConfig();
    if (!config) throw new Error('System configuration missing');

    const rate = Number(config.rate_per_unit);
    const vatPercent = Number(config.vat_percentage);
    const service = Number(config.service_charge);

    // logic yo
    const energyCharge = units * rate;
    const subTotal = energyCharge + service;
    const vatAmount = subTotal * (vatPercent / 100);
    const total = subTotal + vatAmount;

    return {
      units_consumed: units,
      energy_charge: energyCharge.toFixed(2),
      service_charge: service.toFixed(2),
      vat_amount: vatAmount.toFixed(2),
      total_payable: total.toFixed(2),
    };
  }
}