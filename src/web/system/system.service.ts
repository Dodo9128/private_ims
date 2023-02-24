import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SystemRepository } from "../../repository/system.repository";
import { CreateSystemDto, UpdateSystemDto } from "./system.dto";
import { System } from '../../entities/system.entity';

import * as MybatisMapper from "mybatis-mapper";
import { ConnectionService } from "../../database/connection.service";

MybatisMapper.createMapper(['./src/database/sqlmapper/System.xml', './src/database/sqlmapper/Groups.xml', './src/database/sqlmapper/Channel.xml']);
@Injectable()
export class SystemService {
  constructor(
    private connectionService: ConnectionService,
    @InjectRepository(SystemRepository)
    private systemRepository: SystemRepository,
  ) {
  }

  async getSystem(id: string, venue_id: string): Promise<object> {
    let param = {
      id: id,
      venue_id
    };

    const query = MybatisMapper.getStatement('System', 'getSystem', param, {language: 'sql', indent: ' '});
    const [data, field] = await this.connectionService.CP.query(query);

    return {
      data,
    }
  }

  async listSystem(venue_id: string): Promise<object> {
    let param = {
      venue_id: venue_id,
    };

    const query = MybatisMapper.getStatement('System', 'listSystem', param, {language: 'sql', indent: ' '})
    const data: any = await this.connectionService.CP.query(query);

    return {
      iTotalDisplayRecords: data[0].length,
      iTotalRecords: data[0].length,
      data: data[0]
    }
  }

  async insertSystem(venueId: string, createSystemDto: CreateSystemDto): Promise<boolean> {
    return this.systemRepository.onCreate(venueId, createSystemDto);
  }

  async getSystemFor4DPD(system_id: string): Promise<object> {
    const retMap = new Map<string, object>();
    const channelMap = new Map<string, object>();
    const groupMap = new Map<string, object>();

    const systemInfo = this.systemRepository.getSystemInfo(system_id)
    const qChannel = MybatisMapper.getStatement('Channel', 'listChannelFor4DPD', {systemId:system_id}, {language: 'sql'});

    const channelList = await this.systemRepository.listChannelFor4DPD(qChannel);
    //retMap.set("subchannel_count");
    retMap.set("subChannelList", channelList);

    return retMap;
  }
}
