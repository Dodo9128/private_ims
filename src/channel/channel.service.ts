import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelRepository } from "./channel.repository";
//import { GroupsMapper } from "../groups/groups.mapper";
import { Channel } from '../entities/channel.entity';
import { ChannelMapper } from "./channel.mapper";
import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/Channel.xml']);

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository,
    //private groupsMapper: GroupsMapper,
    private channelMapper: ChannelMapper,
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

  async getChannelIncludeGroups(params: Map<string, any>) {
    let channelList = await this.channelMapper.listChannel4Mng(params);
    let preGroupId = null;
    console.log(channelList);
    console.log(typeof channelList)

    return channelList;
    /*channelList.forEach(async (channel) => {
      let finalChannelList = new Map<string, any>();
      let groupId: string = channel.group_id;

      finalChannelList
        .set("channel_id", channel.id)
        .set("channel_index", channel.live_index)
        .set("camera_ip", channel.camera_ip)
        .set("name", channel.name)
        .set("status", channel.status)
        .set("media_type", channel.media_type)
        .set("gimbal_ip", channel.gimbal_ip)
        .set("is_gimbal_preset", channel.is_gimbal_preset)
        .set("server_ip", channel.server_ip)
        .set("server_port", channel.server_port)
        .set("pdview_master_index", channel.pdview_master_index)

      if (preGroupId !== null && (preGroupId === groupId)) {
        finalChannelList
          .set("group_id", "")
          .set("group_index", "")
          .set("group_name", "")
          .set("view_type", "")
          .set("description", "")
          .set("type", "")
          .set("is_external_group", "")
          .set("default_channel_index", "")
          .set("default_audio_index", "")
          .set("is_default_group", "")
          .set("is_interactive", "")
          .set("is_replay", "")
          .set("is_timemachine", "")
          .set("is_pdview", "")
          .set("video_input_codec", "")
          .set("video_input_width", "")
          .set("video_input_height", "")
          .set("video_input_bitrate", "")
          .set("video_input_gop", "")
          .set("video_input_fps", "")
          .set("video_output_codec", "")
          .set("video_output_width", "")
          .set("video_output_height", "")
          .set("video_output_bitrate", "")
          .set("video_output_gop", "")
          .set("video_output_fps", "")
          .set("audio_input_channel_type", "")
          .set("audio_input_codec", "")
          .set("audio_input_sample_rate", "")
          .set("audio_input_sample_bit", "")
          .set("audio_output_channel_type", "")
          .set("audio_output_codec", "")
          .set("audio_output_sample_rate", "")
          .set("audio_output_sample_bit", "")
      } else {
        let groupParam = new Map<string, any>();
        groupParam.set("id", groupId)

        let groupMap: Map<string, any> = await this.groupsMapper.getGroups4Mng(groupParam);


      }
    })*/

  }
}
