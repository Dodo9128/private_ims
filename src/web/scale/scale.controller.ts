import {
  Controller,
  Get,
  Req,
  Res,
  Param,
  Post,
  Body,
  Query,
  ValidationPipe,
  HttpStatus,
  UseInterceptors, UploadedFiles,
  Bind
} from '@nestjs/common';
import { Response } from 'express';
import { ScaleService } from "./scale.service";

@Controller('web/scale')
export class ScaleController {
  constructor(
    private readonly scaleService: ScaleService
  ) {
  }
  @Post('/listScale4Mng')
  postScaleList(@Body('system_id') system_id: string): object {
    return this.scaleService.postScaleList(system_id);
  }
}
