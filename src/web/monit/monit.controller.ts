import {Body, Post, Controller} from "@nestjs/common";
import { Response } from 'express';
import { MonitService } from "./monit.service";

@Controller('web/monit')
export class MonitController {
  constructor(
    private readonly monitService: MonitService,
  ) {}

  @Post('/listService4Monit')
  postService4Monit(@Body('system_id') system_id: string): object {
    return this.monitService.postService4Monit(system_id);
  }

  @Post('/listRegion4Monit')
  listRegion4Monit(
    @Body('system_id') system_id: string,
    @Body('nodeType') nodeType: string,
  ) {
    //return this.monitService.listRegion4Monit(system_id, nodeType)
  }

  @Post('/listMlType4Monit')
  listMlType4Monit(
    @Body('system_id') system_id: string,
    @Body('nodeType') nodeType: string,
    @Body('region') region: string,
  ) {
    //return this.monitService.listMlType4Monit(system_id, nodeType, region)
  }

  @Post('/listNode4Monit')
  listNode4Monit(
    @Body('system_id') system_id: string,
    @Body('nodeType') nodeType: string,
    @Body('region') region: string,
    @Body('mlType') mlType: string,
  ) {
    // return this.monitService.listNode4Monit(system_id, nodeType, region, mltype)
  }

  @Post('/callMonit')
  callMonit(
    @Body('system_id') system_id: string,
    @Body('nodeType') nodeType: string,
    @Body('region') region: string,
    @Body('mlType') mlType: string,
    @Body('list') list: string,
    @Body('action') action: string,
  ) {
    // return this.monitService.callMonit(system_id, nodeType, region, mlType, list, action)
  }

  @Post('/listMonit4Mng')
  postMonitList4Mng(@Body('system_id') system_id: string): object {
    return this.monitService.postMonitList4Mng(system_id);
  }
}

