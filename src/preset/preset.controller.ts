import { Controller, Get } from '@nestjs/common';
import { PresetService } from './preset.service';

@Controller('preset')
export class PresetController {
  constructor(private readonly presetService: PresetService) {}

  @Get('/cards')
  getAllPreset() {
    return this.presetService.findAllCard();
  }
}
