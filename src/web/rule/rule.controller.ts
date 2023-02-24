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
  @Post('/listRule4Mng')
  postRuleList(@Body('system_id') system_id: string): object {
    return this.ruleService.postRuleList(system_id);
  }

}
