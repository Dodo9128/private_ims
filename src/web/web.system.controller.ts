import {Res, Controller, Post, Body, Query, HttpCode, HttpStatus} from '@nestjs/common';

import { Response } from "express";
import { SystemMapper } from "../system/system.mapper";
import { IResultReturn } from "../global/interface";
@Controller('web/system')
export class WebSystemController {
  constructor(private readonly systemMapper: SystemMapper) {}

  @Post('/getSystem')
  async getSystem(
    @Body('id') id: string,
    @Res() res: Response,
  ) {
    return this.systemMapper.getSystem(id).then((rst) => {
      res.status(HttpStatus.OK).json({
        result: "ok",
        message: "SUCCESS",
        data: rst,
      })
    });
  }

  @Post('/listSystem4Mng')
  async listSystem(
    @Query('venue_id') venue_id: string,
    @Res() res: Response,
    ) {
    let Result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: await this.systemMapper.listSystem(venue_id),
    }

    return res.status(HttpStatus.OK).json(Result);
  }
}