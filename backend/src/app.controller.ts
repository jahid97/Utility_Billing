import { Controller, Get, Post, Body, Put, Headers, UnauthorizedException, ValidationPipe, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateConfigDto, CalculateBillDto } from './dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // --- 1. HEALTH CHECK ---
  // Url: http://localhost:3000/
  @Get()
  getHello(): string {
    return 'Utility Bill API is running!';
  }

  // --- 2. PROJECT WORKING SYSTEM (api/home) ---

  // Url: http://localhost:3000/api/home/calculate
  @Post('api/home/calculate')
  @UsePipes(new ValidationPipe())
  async calculate(@Body() body: CalculateBillDto) {
    return this.appService.calculateBill(body.units);
  }

  // Url: http://localhost:3000/api/home/admin/config
  @Put('api/home/admin/config')
  @UsePipes(new ValidationPipe())
  async updateConfig(
    @Body() body: UpdateConfigDto,
    @Headers('x-admin-key') adminKey: string
  ) {
    if (adminKey !== process.env.ADMIN_SECRET) {
      throw new UnauthorizedException('Invalid admin key try again..');
    }
    return this.appService.updateConfig(body);
  }

  // Url: http://localhost:3000/api/home/admin/config
  @Get('api/home/admin/config')
  async getConfig(@Headers('x-admin-key') adminKey: string) {
    if (adminKey !== process.env.ADMIN_SECRET) {
      throw new UnauthorizedException('Invalid admin key try again..');
    }
    return this.appService.getConfig();
  }
}