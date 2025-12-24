import { IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class UpdateConfigDto {
  @IsNumber() @Min(0)
  rate_per_unit: number;

  @IsNumber() @Min(0) @Max(100)
  vat_percentage: number;

  @IsNumber() @Min(0)
  service_charge: number;
}

export class CalculateBillDto {
  @IsNumber() @Min(0) @IsNotEmpty()
  units: number;
}