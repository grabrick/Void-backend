import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preset } from './schemas/preset.schema';

@Injectable()
export class PresetService {
  constructor(@InjectModel(Preset.name) private PresetModel: Model<Preset>) {}

  async findAllCard() {
    const findCards = await this.PresetModel.find();
    if (!findCards) {
      throw new HttpException('No cards found', HttpStatus.NOT_FOUND);
    }
    return findCards;
  }
}
