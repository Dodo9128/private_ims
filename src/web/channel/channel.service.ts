import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelRepository } from "../../repository/channel.repository";
import { CreateChannelDto, UpdateChannelDto } from "./channel.dto";
import { Channel } from '../../entities/channel.entity';

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
}
