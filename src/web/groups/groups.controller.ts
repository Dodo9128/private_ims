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
import { CreateGroupsDto, UpdateGroupsDto } from "./groups.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {multerMemoryOptions} from "../../libs/utils/multer.options";

@Controller('/web/group')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService
  ) {}
  @Post('/listGroups4Mng')
  postGroupsList4Mng(@Body('system_id') system_id: string): object {
    return this.groupsService.postGroupsList4Mng(system_id);
  }

  @Post('/insertGroups')
  insertGroups(
    @Body() createGroupsDto: CreateGroupsDto,
  ) {
    // return this.groupsService.insertGroups(createGroupsDto);
  }

  @Post('/updateGroups')
  updateGroups(
    @Body() updateGroupsDto: UpdateGroupsDto,
  ) {
    // return this.groupsService.updateGroups(updateGroupsDto);
  }

  @Post('/deleteGroups')
  deleteGroups(
    @Body('id') id: string,
  ) {
    //return this.groupsService.deleteGroups(id);
  }

  @Post('/upLoadIMSGroupChannelExcel')
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOptions))
  @Bind(UploadedFiles())
  async uploadFileMemory(
    files: File[],
    @Res() res: Response,
  ) {

  }

  @Post('/notificationGroupChannelInfo')
  notificationGroupChannelInfo(
    @Body('id') id: string,
  ) {
    // return this.groupsSertvice.notificationGroupChannelInfo(id);
  }
}

