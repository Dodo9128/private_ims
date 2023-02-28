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
import { CreateScaleDto, UpdateScaleDto } from "./scale.dto";

@Controller('web/scale')
export class ScaleController {
  constructor(
    private readonly scaleService: ScaleService
  ) {}

  @Post('/insertScale')
  insertScale(
    @Body() createScaleDto: CreateScaleDto,
  ) {
    // return this.scaleService.insertScale(createScaleDto);
  }

  @Post('/updateScale')
  updateScale(
    @Body() updateScaleDto: UpdateScaleDto,
  ) {
    // return this.scaleService.updateScale(updateScaleDto);
  }

  @Post('/deleteScale')
  deleteScale(
    @Body('id') id: string,
  ) {
    // return thi.scaleService.deleteScale(id);
  }
  @Post('/listScale4Mng')
  postScaleList(@Body('system_id') system_id: string): object {
    return this.scaleService.postScaleList(system_id);
  }
}
