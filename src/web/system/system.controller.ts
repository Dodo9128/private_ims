import { Controller, Get, Req, Res, Param, Post, Body, Query, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { SystemService } from "./system.service";
import { CreateSystemDto, UpdateSystemDto } from "./system.dto";

@Controller('web/system')
export class SystemController{
  constructor(private readonly systemService: SystemService) {}

  @Post('/getSystem')
  getSystem(@Body('id') id: string, @Body('venue_id') venue_id: string): object {
    return this.systemService.getSystem(id, venue_id);
  }

  @Post('/insertSystem')
  insertsystem(@Res() res: Response, @Body('venueId') venueId: string, @Body() createSystemDto: CreateSystemDto) {
    return this.systemService.insertSystem(venueId, createSystemDto).then((result) => {
      res.status(HttpStatus.OK).json({ success: result });
    });
  }

  @Post('/listSystem4Mng')
  listSystem(@Body('venue_id') venue_id: string): object {
    return this.systemService.listSystem(venue_id);
  }

  @Post('/getSystemFor4DPD')
  getSystemFor4DPD(@Body('system_id') system_id: string) {
    return this.systemService.getSystemFor4DPD(system_id);
  }
}