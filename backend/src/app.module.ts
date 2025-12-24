import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Configuration],
      synchronize: true, //create tables
      ssl: { rejectUnauthorized: false }, 
    }),
    TypeOrmModule.forFeature([Configuration]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}