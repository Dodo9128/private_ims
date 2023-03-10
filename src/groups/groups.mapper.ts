import { InjectRepository } from "@nestjs/typeorm";
import { GroupsRepository } from "./groups.repository";
import { Scale } from "../entities/scale.entity";
import * as MybatisMapper from "mybatis-mapper";
import { PageUtil } from "../util/page.util";

MybatisMapper.createMapper(['./src/database/sqlmapper/Groups.xml'])

const myBatisFormat: object = { language: 'sql' };

export class GroupsMapper {
  constructor(
    @InjectRepository(GroupsRepository)
    private groupsRepository: GroupsRepository,
  ) {}

  public async listGroups(params: Map<string, any>): Promise<Map<string, any>> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const totalCount: number = await this.listGroupsCount(params);
    const query = MybatisMapper.getStatement('Groups', 'listGroups', Object.fromEntries(params), myBatisFormat);

    return PageUtil.setPageDataMap(await this.groupsRepository.query(query), totalCount);
  }

  public async listGroupsCount(params: Map<string, any>): Promise<number> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const query = MybatisMapper.getStatement('Groups', 'listGroupsCount', Object.fromEntries(params), myBatisFormat);
    const Result = await this.groupsRepository.query(query);

    return Result[0].cnt;
  }

  public async listGroups4Mng(params: Map<string, any>): Promise<Map<string, any>> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const totalCount: number = await this.listGroupsCount(params);
    const query = MybatisMapper.getStatement('Groups', 'listGroups', Object.fromEntries(params), myBatisFormat);

    return PageUtil.setPageDataMap(await this.groupsRepository.query(query), totalCount);
  }

  public async getGroups(params: Map<string, any>) {
    const query = MybatisMapper.getStatement('Groups', 'getGroups', Object.fromEntries(params), myBatisFormat);

    return await this.groupsRepository.query(query);
  }
}