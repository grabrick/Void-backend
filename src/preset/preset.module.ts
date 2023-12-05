import { Module } from '@nestjs/common';
import { PresetService } from './preset.service';
import { PresetController } from './preset.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Preset, PresetSchema } from './schemas/preset.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Preset.name, schema: PresetSchema }]),
  ],
  controllers: [PresetController],
  providers: [PresetService],
})
export class PresetModule {}
