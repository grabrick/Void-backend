import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { PresetService } from './preset.service';
import { PropsPresetCard } from './dto/preset.dto';

@Controller('preset')
export class PresetController {
  constructor(private readonly presetService: PresetService) {}

  @Get('/cards')
  getAllPreset() {
    return this.presetService.findAllCard();
  }

  @Patch(':id/paymentPreset')
  paymentPreset(@Param('id') id: string, @Body() preset: PropsPresetCard) {
    return this.presetService.paymentPreset(preset, id);
  }
}
