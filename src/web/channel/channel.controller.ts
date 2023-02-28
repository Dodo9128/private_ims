import {Bind, Body, Controller, Post, Res, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { ChannelService } from "./channel.service";
import { CreateChannelDto, UpdateChannelDto } from "./channel.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerMemoryOptions } from "../../libs/utils/multer.options";
import { Response } from "express";

@Controller('web/channel')
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService
  ) {
  }
  @Post('/channel/getChannelIncludeGroups')
  postChannelList4Mng(@Body('system_id') system_id: string): object {
    return this.channelService.postChannelList4Mng(system_id);
  }

  @Post('/insertChannel')
  insertChannel(
    @Body() createChannelDto: CreateChannelDto,
  ) {
    // return this.channelService.insertChannel(createChannelDto)
  }

  @Post('/updateChannel')
  updateChannel(
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    // return this.channelService.updateChannel(updateChannelDto)
  }

  @Post('/deleteChannel')
  deleteChannel(
    @Body('id') id: string,
  ) {
    // return this.channelService.deleteChannel(id);
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
    @Body('system_id') system_id: string,
  ) {
    // return this.channelService.notificationGroupChannelInfo(system_id)
  }
}
