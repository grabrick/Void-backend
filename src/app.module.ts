import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PresetModule } from './preset/preset.module';
import * as config from '../config/config.json';

@Module({
  imports: [MongooseModule.forRoot(config.MONGOURL), AuthModule, PresetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
