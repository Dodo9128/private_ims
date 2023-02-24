import { Injectable } from "@nestjs/common";

import * as MybatisMapper from "mybatis-mapper";

import * as fs from "fs";
import { extname } from "path";
import {MonitRepository} from "../../repository/monit.repository";

MybatisMapper.createMapper(['./src/database/sqlmapper/Node.xml', './src/database/sqlmapper/Monit.xml']);

export class MonitService {
  constructor(
    private readonly monitRepository: MonitRepository,
  ) {
  }
  async postService4Monit(system_id: string): Promise<object> {
    const query = MybatisMapper.getStatement('Node', 'listService4Monit', {system_id}, {language: 'sql'})
    const data: any = await this.monitRepository.lstSvc4Monit(query);

    return {
      data: data[0]
    }
  }

  async postMonitList4Mng(system_id: string): Promise<object> {
    const query = MybatisMapper.getStatement('Monit', 'listMonit', {system_id}, {language: 'sql'})
    const data: any = await this.monitRepository.listMonit(query);

    return {
      data: data[0]
    }
  }
}
