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
import { RuleService} from "./rule.service";

@Controller('web/rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post('/insertRule')
  insertRule(
    @Body('name') name: string,
    @Body('node_type') node_type: string,
    @Body('session') session: number,
    @Body('max_instances') max_instances: number,
    @Body('region') region: string,
  ) {
    //return this.ruleService.insertRule(name, node_type, session, max_instances, region);
  }

  @Post('/updateRule')
  updateRule(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('node_type') node_type: string,
    @Body('session') session: number,
    @Body('max_instances') max_instances: number,
    @Body('region') region: string,
  ) {
    //return this.ruleService.updateRule(id, name, node_type, session, max_instances, region);
  }

  @Post('/listRule4Mng')
  postRuleList(@Body('system_id') system_id: string): object {
    return this.ruleService.postRuleList(system_id);
  }

  /**
   * 확인 필요
  @Post('/listRule')*/

  /**
   * 확인필요
   @Post('/getRule')*/


  @Post('/deleteRule')
  deleteRule(
    @Body('id') id: string,
  ) {
    //return this.ruleService.deleteRule(id)
  }
}
