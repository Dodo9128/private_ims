import {Bind, Body, Controller, HttpStatus, Post, Res, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { ChannelService } from "../channel/channel.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerMemoryOptions } from "../libs/utils/multer.options";
import { Response } from "express";

@Controller('web/channel')
export class WebChannelController {
  constructor(
    private readonly channelService: ChannelService
  ) {
  }
  @Post('/getChannelIncludeGroups')
  postChannelList4Mng(
    @Body('system_id') system_id: string,
    @Res() res: Response,
  ): object {
    return this.channelService.postChannelList4Mng(system_id);
  }

  @Post('/getChannelIncludeGroups4Cms')
  async getChannelIncludeGroups4Cms(
    @Body('system_id') system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params.set("system_id", system_id)

    const Result: Map<string, any> = await this.channelService.getChannelIncludeGroups(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/notificationGroupChannelInfo')
  notificationGroupChannelInfo(
    @Body('system_id') system_id: string,
  ) {
    // return this.channelService.notificationGroupChannelInfo(system_id)
  }

  @Post('upLoadIMSGroupChannelExcel')
  upLoadIMSGroupChannelExcel() {

  }

  @Post('/updateChannel')
  updateChannel(

  ) {
    // return this.channelService.updateChannel(updateChannelDto)
  }

}
