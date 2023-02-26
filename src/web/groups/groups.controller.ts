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
import { GroupsService} from "./groups.service";

@Controller('/web/groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService
  ) {
  }
  @Post('/listGroups4Mng')
  postGroupsList4Mng(@Body('system_id') system_id: string): object {
    return this.groupsService.postGroupsList4Mng(system_id);
  }
}
