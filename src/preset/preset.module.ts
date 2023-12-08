import { Module } from '@nestjs/common';
import { PresetService } from './preset.service';
import { PresetController } from './preset.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Preset, PresetSchema } from './schemas/preset.schema';
import { User, UserSchema } from 'src/auth/schemas/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Preset.name, schema: PresetSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PresetController],
  providers: [PresetService],
})
export class PresetModule {}
