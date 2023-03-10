import { Injectable } from '@nestjs/common';
import { ChannelRepository } from "./channel.repository";
import { Channel } from '../entities/channel.entity';

import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/Channel.xml']);

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
  ) {}
  async postChannelList4Mng(system_id: string): Promise<object> {
    let param = {
      system_id: system_id
    };

    const query = MybatisMapper.getStatement('Channel', 'listChannel4Mng', param, {language: 'sql'})
    const data: any = await this.channelRepository.lstChannel4Mng(query);

    return {
      data: data[0]
    }
  }

  async insertChannel(params: Map<string, any>): Promise<Channel> {
    let channel: Channel = new Channel();
    let items: Channel;
    let channelId: string = await this.channelRepository.makeChannelId(params.get("system_id"));

    channel.id = channelId;
    channel.system_id = params.get("system_id");
    channel.name = params.get("name");
    channel.description = params.get("description");
    channel.live_index = params.get("live_index");
    channel.pdview_master_index = params.get("pdview_master_index");
    channel.gimbal_ip = params.get("gimbal_ip");
    channel.is_gimbal_reset = params.get("is_gimbal_reset");
    channel.camera_ip = params.get("camera_ip");
    channel.server_ip = params.get("server_ip");
    channel.server_port = params.get("server_port");
    channel.status = params.get("status");
    channel.media_type = params.get("media_type");
    channel.registered_at  = new Date(Date.now());

    items = await this.channelRepository.save(channel);

    return items;
  }

  async updateChannel(params: Map<string, any>): Promise<Channel> {
    let channel: Channel = new Channel();
    let items: Channel;

    channel.id             = params.get("channel_id");
    channel.system_id      = params.get("system_id");
    channel.updated_at     = new Date(Date.now());
    channel.name = params.get("name");
    channel.description = params.get("description");
    channel.live_index = params.get("live_index");
    channel.pdview_master_index = params.get("pdview_master_index");
    channel.gimbal_ip = params.get("gimbal_ip");
    channel.is_gimbal_reset = params.get("is_gimbal_reset");
    channel.camera_ip = params.get("camera_ip");
    channel.server_ip = params.get("server_ip");
    channel.server_port = params.get("server_port");
    channel.status = params.get("status");
    channel.media_type = params.get("media_type");

    items = await this.channelRepository.save(channel);

    return items;
  }
}
