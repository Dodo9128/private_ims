import { Controller, Res, Post, Body, HttpStatus, Query } from '@nestjs/common';
import { Response } from 'express';
import { RuleService } from "../rule/rule.service";
import { JsonResult } from "../libs/utils/jsonResult";

@Controller('web/rule')
export class WebRuleController {
  constructor(private ruleService: RuleService) {}

  @Post('/insertRule')
  async insertRule(
    @Body('system_id') system_id: string,
    @Body('name') name: string,
    @Body('node_type') node_type: string,
    @Body('session') session: number,
    @Body('max_instances') max_instances: number,
    @Body('region') region: string,
    @Res() res: Response,
  ) {
    let params = new Map<string,any>();

    params
      .set("system_id", system_id)
      .set("name", name)
      .set("node_type", node_type)
      .set("session", session)
      .set("max_instances", max_instances)
      .set("region", region)

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.ruleService.insertRule4Web(params));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/updateRule')
  async updateRule(
    @Body('rule_id') id: string,
    @Body('system_id') system_id: string,
    @Body('name') name: string,
    @Body('node_type') node_type: string,
    @Body('session') session: number,
    @Body('max_instances') max_instances: number,
    @Body('region') region: string,
    @Res() res: Response,
  ) {
    let params = new Map<string,any>();

    params
      .set("system_id", system_id)
      .set("name", name)
      .set("node_type", node_type)
      .set("session", session)
      .set("max_instances", max_instances)
      .set("region", region)

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.ruleService.updateRule4Web(params));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listRule4Mng')
  async listRule4Mng(
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

    const Result: Map<string, any> = await this.ruleService.listRule4Mng(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listRule')
  async listRule(
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

    const Result: Map<string, any> = await this.ruleService.listRule(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

   @Post('/getRule')
   async getRule(
     @Body("system_id") system_id: string,
     @Body("id") rule_id: string,
     @Res() res: Response,
   ) {
     let params = new Map<string, any>();
     params
      .set("system_id", system_id)
      .set("id", rule_id);

     const Result: Map<string, any> = await this.ruleService.getRule(params);

     return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
   }


  @Post('/deleteRule')
  async deleteRule(
    @Body("system_id") system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id);

    const Result = JsonResult.makeSuccessBool(await this.ruleService.deleteRule(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }
}
