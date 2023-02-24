import {Body, Post, Controller} from "@nestjs/common";
import { Response } from 'express';
import { MonitService } from "./monit.service";

@Controller('web/monit')
export class MonitController {
  constructor(
    private readonly monitService: MonitService,
  ) {}

  @Post('/mlistService4Monit')
  postService4Monit(@Body('system_id') system_id: string): object {
    return this.monitService.postService4Monit(system_id);
  }

  @Post('/monit/listMonit4Mng')
  postMonitList4Mng(@Body('system_id') system_id: string): object {
    return this.monitService.postMonitList4Mng(system_id);
  }
}

