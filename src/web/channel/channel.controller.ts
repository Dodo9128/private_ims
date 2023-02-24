import { Body, Controller, Post } from '@nestjs/common';
import { ChannelService } from "./channel.service";

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
}
