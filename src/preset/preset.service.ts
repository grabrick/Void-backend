import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preset } from './schemas/preset.schema';
import { PropsPresetCard } from './dto/preset.dto';
import { User } from 'src/auth/schemas/auth.schema';

@Injectable()
export class PresetService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Preset.name) private PresetModel: Model<Preset>,
  ) {}

  async findAllCard() {
    const findCards = await this.PresetModel.find();
    if (!findCards) {
      throw new HttpException('No cards found', HttpStatus.NOT_FOUND);
    }
    return findCards;
  }

  async paymentPreset(preset: PropsPresetCard, id: string) {
    const findUser = await this.UserModel.findByIdAndUpdate(
      { _id: id },
      {
        activePresset: {
          presetID: preset.id,
          namePresset: preset.name,
          price: preset.price,
          params: null, // доработать логику params
        },
      },
      { new: true },
    );
    return findUser;
  }
}
