import { Module } from '@nestjs/common';
import { ScaleService } from './scale.service';
import { WebScaleController } from '../web/web.scale.controller';

@Module({
  providers: [ScaleService],
  controllers: [WebScaleController]
})
export class ScaleModule {}
