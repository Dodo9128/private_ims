import {Body, Post, Controller, Res, HttpStatus, Query} from "@nestjs/common";
import { Response } from 'express';
import { MonitService } from "../monit/monit.service";
import { NodeService } from "../node/node.service";
import {JsonResult} from "../libs/utils/jsonResult";

@Controller('web/monit')
export class WebMonitController {
  constructor(
    private readonly monitService: MonitService,
    private nodeService: NodeService,
  ) {}

  @Post('/listService4Monit')
  async listService4Monit(
    @Query('system_id') systemId: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params.set("systemId", systemId);

    const Result = JsonResult.makeSuccessArray(await this.nodeService.listService4Monit(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listRegion4Monit')
  async listRegion4Monit(
    @Body('systemId') system_id: string,
    @Body('nodeType') nodeType: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("systemId", system_id)
      .set("nodeType", nodeType);

    const Result = JsonResult.makeSuccessArray(await this.nodeService.listRegion4Monit(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listNode4Monit')
  async listNode4Monit(
    @Body('systemId') system_id: string,
    @Body('nodeType') nodeType: string,
    @Body('region') region: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("systemId", system_id)
      .set("nodeType", nodeType)
      .set("region", region);

    const Result = JsonResult.makeSuccessArray(await this.nodeService.listNode4Monit(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listMlType4Monit')
  async listMlType4Monit(
    @Body('systemId') system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params.set("systemId", system_id);

    const Result = JsonResult.makeSuccessArray(await this.nodeService.listMlType4Monit(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listMonit4Mng')
  async listMonit4Mng(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('sortColumn') sortColumn: string,
    @Query('isDescending') isDescending: string,
    @Body("system_id") system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("pageNo", (pageNo) ? pageNo : 1)
      .set("pageSize", (pageSize) ? pageSize : 9999)
      .set("sortColumn", (sortColumn) ? sortColumn : "id")
      .set("isDescending", (isDescending) ? isDescending : "asc")
      .set("system_id", system_id);

    const Result: Map<string, any> = await this.monitService.listMonit(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/callMonit')
  async callMonit(
    @Body('system_id') system_id: string,
    @Body('nodeType') nodeType: string,
    @Body('region') region: string,
    @Body('mlType') mlType: string,
    @Body('list') list: string,
    @Body('action') action: string,
    @Res() res: Response,
  ) {
      let params = new Map<string, any>();
      params
        .set("system_id", system_id)
        .set("nodeType", nodeType)
        .set("region", region)
        .set("mlType", mlType)
        .set("list", list)
        .set("action", action)

    /*
    TODO: callMonit
      const Result = await this.monitService.callMonit(params);

      return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
    */
  }

  @Post('/listNode4MonitAction')
  async listNode4MonitAction(
    @Body('systemId') systemId: string,
    @Body('nodeType') nodeType: string,
    @Body('region') region: string,
    @Body('mlType') mlType: string,
    @Body('list') list: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("systemId", systemId)
      .set("nodeType", nodeType)
      .set("region", region)
      .set("mlType", mlType)
      .set("list", list)

    const Result: Map<string, any> = await this.nodeService.listNode4MonitAction(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }
}

