import { Module } from '@nestjs/common';
import { ScaleService } from './scale.service';
import { ScaleController } from './scale.controller';

@Module({
  providers: [ScaleService],
  controllers: [ScaleController]
})
export class ScaleModule {}
