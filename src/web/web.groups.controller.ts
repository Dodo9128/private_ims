import {Controller, Res, Post, Body, UseInterceptors, UploadedFiles, Bind, HttpStatus, Query} from '@nestjs/common';
import { Response } from 'express';
import { GroupsService} from "../groups/groups.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerMemoryOptions } from "../libs/utils/multer.options";
import {JsonResult} from "../libs/utils/jsonResult";

@Controller('/web/group')
export class WebGroupsController {
  constructor(
    private readonly groupsService: GroupsService
  ) {}

  @Post('/insertGroups')
  async insertGroups(
    @Body("name") name: string,
    @Body("system_id") system_id: string,
    @Body("description") description: string,
    @Body("type") type: string,
    @Body("is_external_group") is_external_group: string,
    @Body("is_replay") is_replay: string,
    @Body("is_pdview") is_pdview: string,
    @Body("is_interactive") is_interactive: string,
    @Body("is_timemachine") is_timemachine: string,
    @Body("default_channel_index") default_channel_index: number,
    @Body("default_audio_index") default_audio_index: number,
    @Body("is_default_group") is_default_group: string,
    @Body("group_index") group_index: number,
    @Body("view_type") view_type: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("name", name)
      .set("system_id", system_id)
      .set("description", description)
      .set("type", type)
      .set("is_external_group", is_external_group)
      .set("is_replay", is_replay)
      .set("is_pdview", is_pdview)
      .set("is_interactive", is_interactive)
      .set("is_timemachine", is_timemachine)
      .set("default_channel_index", default_channel_index)
      .set("default_audio_index", default_audio_index)
      .set("is_default_group", is_default_group)
      .set("group_index", group_index)
      .set("view_type", view_type)

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.groupsService.insertGroup(params));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/updateGroups')
  async updateGroups(
    @Body("groups_id") groups_id: string,
    @Body("name") name: string,
    @Body("system_id") system_id: string,
    @Body("description") description: string,
    @Body("type") type: string,
    @Body("is_external_group") is_external_group: string,
    @Body("is_replay") is_replay: string,
    @Body("is_pdview") is_pdview: string,
    @Body("is_interactive") is_interactive: string,
    @Body("is_timemachine") is_timemachine: string,
    @Body("default_channel_index") default_channel_index: number,
    @Body("default_audio_index") default_audio_index: number,
    @Body("is_default_group") is_default_group: string,
    @Body("group_index") group_index: number,
    @Body("view_type") view_type: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("groups_id", groups_id)
      .set("name", name)
      .set("system_id", system_id)
      .set("description", description)
      .set("type", type)
      .set("is_external_group", is_external_group)
      .set("is_replay", is_replay)
      .set("is_pdview", is_pdview)
      .set("is_interactive", is_interactive)
      .set("is_timemachine", is_timemachine)
      .set("default_channel_index", default_channel_index)
      .set("default_audio_index", default_audio_index)
      .set("is_default_group", is_default_group)
      .set("group_index", group_index)
      .set("view_type", view_type)

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.groupsService.updateGroup(params));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listGroups4Mng')
  async listGroups4Mng(
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

    const Result: Map<string, any> = await this.groupsService.listGroups4Mng(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listGroups')
  async listGroups(
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

    const Result: Map<string, any> = await this.groupsService.listGroups(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/getGroups')
  async getGroups(
    @Body("system_id") system_id: string,
    @Body("groupsID") groupsID: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("groupsID", groupsID);

    const Result: Map<string, any> = await this.groupsService.getGroups(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/getGroupsIncludeChannel')
  async getGroupsIncludeChannel(
    @Body("system_id") system_id: string,
    @Body("groupsID") groupsID: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("groupsID", groupsID);

    const Result: Map<string, any> = await this.groupsService.getGroupsIncludeChannel(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/deleteGroups')
  async deleteGroups(
    @Body("system_id") system_id: string,
    @Body("groupsID") groupsID: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("groupsID", groupsID);

    const Result: Map<string, any> = JsonResult.makeSuccessBool(await this.groupsService.deleteGroups(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/notificationGroupChannelInfo')
  async notificationGroupChannelInfo(
    @Body("system_id") system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params.set("system_id", system_id);

    const Result: Map<string, any> = await this.groupsService.notificationGroupChannelInfo(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/upLoadIMSGroupChannelExcel')
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOptions))
  @Bind(UploadedFiles())
  async uploadFileMemory(
    files: File[],
    @Body('system_id') system_id: string,
    @Res() res: Response,
  ) {
    this.groupsService.uploadFileMemory(system_id, files)
      .then(result => {
        //console.log(result)
      });

    res.status(HttpStatus.OK).json({
      data: "",
      result: "ok",
      message: "SUCCESS"
    })
  }
}

