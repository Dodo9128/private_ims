import { InjectRepository } from "@nestjs/typeorm";
import { MonitRepository } from "./monit.repository";
import { Monit } from "../entities/monit.entity";
import * as MybatisMapper from "mybatis-mapper";
import { PageUtil } from "../util/page.util";

MybatisMapper.createMapper(['./src/database/sqlmapper/Monit.xml'])

const myBatisFormat: object = { language: 'sql' };

export class MonitMapper {
  constructor(
    @InjectRepository(MonitRepository)
    private monitRepository: MonitRepository,
  ) {}

  public async listMonit(params: Map<any, any>): Promise<Map<string, any>> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const totalCount: number = await this.listMonitCount(params);
    const query = MybatisMapper.getStatement('Monit', 'listMonit', Object.fromEntries(params), myBatisFormat);

    return PageUtil.setPageDataMap(await this.monitRepository.query(query), totalCount);
  }

  public async listMonitCount(params: Map<string, any>): Promise<number> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const query = MybatisMapper.getStatement('Monit', 'listMonitCount', Object.fromEntries(params), myBatisFormat);
    const Result = await this.monitRepository.query(query);

    return Result[0].cnt;
  }
}