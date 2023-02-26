import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SystemRepository } from "../../repository/system.repository";
import { CreateSystemDto, UpdateSystemDto } from "./system.dto";
import { System } from '../../entities/system.entity';

import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/System.xml', './src/database/sqlmapper/Groups.xml', './src/database/sqlmapper/Channel.xml']);
@Injectable()
export class SystemService {
  constructor(
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
    const data = await this.systemRepository.getSystem(query);

    return {
      data,
    }
  }

  async listSystem(venue_id: string): Promise<object> {
    let param = {
      venue_id: venue_id,
    };

    const query = MybatisMapper.getStatement('System', 'listSystem', param, {language: 'sql', indent: ' '})
    const data: any = await this.systemRepository.listSystem(query);

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


    return retMap;
  }
}
