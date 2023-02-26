import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { SystemRepository } from "../../repository/system.repository";
import { CreateGroupsDto, UpdateGroupsDto } from "./groups.dto";
import { Groups } from '../../entities/group.entity';

import * as MybatisMapper from "mybatis-mapper";

import {GroupsRepository} from "../../repository/groups.repository";

MybatisMapper.createMapper(['./src/database/sqlmapper/System.xml', './src/database/sqlmapper/Groups.xml', './src/database/sqlmapper/Channel.xml']);
@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(SystemRepository)
    private groupsRepository: GroupsRepository,
  ) {
  }


  async postGroupsList4Mng(system_id: string): Promise<object> {
    let param = {
      system_id: system_id
    };

    const query = MybatisMapper.getStatement('Groups', 'listGroups4Mng', param, {language: 'sql', indent: ' '})
    const data: any = await this.groupsRepository.getList4Mng(query);

    return { data };
  }
}
