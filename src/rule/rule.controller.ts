import { Controller, Get, Param, Post, Query, Ip, Req, Res, HttpStatus, Body, Put, Delete } from '@nestjs/common';
import { RuleService } from "./rule.service";
import { JsonResult } from "../libs/utils/jsonResult";
import { Response, Request } from 'express';
import * as CommonCode from "../global/commonCode";

@Controller('rule')
export class RuleController {
  constructor(
    private ruleService: RuleService,
  ) {}

  @Post("/insertRule")
  public async insertRule(
    @Body("system_id") system_id: string,
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("node_type") node_type: string,
    @Body("session") session: number,
    @Body("max_instances") max_instances: number,
    @Body("region") region: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("name", name)
      .set("description", description)
      .set("node_type", node_type)
      .set("session", session)
      .set("max_instances", max_instances)
      .set("region", region);

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.ruleService.insertRule4Web(params));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/updateRule")
  public async insertRule4Web(
    @Body("rule_id") rule_id: string,
    @Body("system_id") system_id: string,
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("node_type") node_type: string,
    @Body("session") session: number,
    @Body("max_instances") max_instances: number,
    @Body("region") region: string,
    @Res() res: Response,
  ){
    let params = new Map<string, any>();
    params
      .set("rule_id", rule_id)
      .set("system_id", system_id)
      .set("name", name)
      .set("description", description)
      .set("node_type", node_type)
      .set("session", session)
      .set("max_instances", max_instances)
      .set("region", region);

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.ruleService.updateRule4Web(params));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/listRule4Mng")
  public async listRule4Mng(
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

    const Result: Map<string, any> = JsonResult.makeSuccessPaging(await this.ruleService.listRule4Mng(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/listRule")
  public async listRule(
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

    const Result: Map<string, any> = JsonResult.makeSuccessPaging(await this.ruleService.listRule(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/getRule")
  public async getRule(
    @Body("id") id: string,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessVo(await this.ruleService.getRule(new Map(Object.entries( {id}))));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/deleteRule")
  public async deleteRule(
    @Body("id") id: string,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessBool(await this.ruleService.deleteRule(new Map(Object.entries( {id}))));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }
}