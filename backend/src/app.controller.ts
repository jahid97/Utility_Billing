import { Controller, Get, Post, Body, Put, Headers, UnauthorizedException, ValidationPipe, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateConfigDto, CalculateBillDto } from './dtos';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //  calculate bill (public)
  @Post('calculate')
  @UsePipes(new ValidationPipe())
  async calculate(@Body() body: CalculateBillDto) {
    return this.appService.calculateBill(body.units);
  }

  // update config Protected by header key
  @Put('admin/config')
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

  //  get current config for admin pre_filling)
  @Get('admin/config')
  async getConfig(@Headers('x-admin-key') adminKey: string) {
    if (adminKey !== process.env.ADMIN_SECRET) {
      throw new UnauthorizedException('Invalid admin key try again..');
    }
    return this.appService.getConfig();
  }

  getHello(): string {
    return 'Hello World!';
  }
}