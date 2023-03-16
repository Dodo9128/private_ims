import { InjectRepository } from "@nestjs/typeorm";
import { ChannelRepository } from "./channel.repository";
import { Channel } from "../entities/channel.entity";
import * as MybatisMapper from "mybatis-mapper";
import { PageUtil } from "../util/page.util";

MybatisMapper.createMapper(['./src/database/sqlmapper/Channel.xml'])

const myBatisFormat: object = { language: 'sql' };

export class ChannelMapper {
  constructor(
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository,
  ) {}

  public async listChannel(params: Map<string, any>): Promise<Map<string, any>> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const totalCount: number = await this.listChannelCount(params);
    const query = MybatisMapper.getStatement('Channel', 'listChannel', Object.fromEntries(params), myBatisFormat);

    return PageUtil.setPageDataMap(await this.channelRepository.query(query), totalCount);
  }

  public async listChannelFor4DPD(
    params: Map<string, any>,
  ): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement('Channel', 'listChannelFor4DPD', Object.fromEntries(params), myBatisFormat);

    return await this.channelRepository.query(query);
  }

  public async listChannelFor4DSS(
    params: Map<string, any>,
  ): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement('Channel', 'listChannelFor4DSS', Object.fromEntries(params), myBatisFormat);

    return await this.channelRepository.query(query);
  }

  public async listChannelFor4DRS(
    params: Map<string, any>,
  ): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement('Channel', 'listChannelFor4DRS', Object.fromEntries(params), myBatisFormat);

    return await this.channelRepository.query(query);
  }

  public async listChannelFor4DML(
    params: Map<string, any>,
  ): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement('Channel', 'listChannelFor4DML', Object.fromEntries(params), myBatisFormat);

    return await this.channelRepository.query(query);
  }

  public async getChannel(
    params: Map<string, any>,
  ): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement('Channel', 'getChannel', Object.fromEntries(params), myBatisFormat);

    return await this.channelRepository.query(query);
  }

  public async listChannelCount(params: Map<string, any>): Promise<number> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const query = MybatisMapper.getStatement('Channel', 'listGroupsCount', Object.fromEntries(params), myBatisFormat);
    const Result = await this.channelRepository.query(query);

    return Result[0].cnt;
  }

  public async listChannel4Mng(params: Map<string, any>): Promise<Map<string, any>> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const query = MybatisMapper.getStatement('Channel', 'listChannel4Mng', Object.fromEntries(params), myBatisFormat);

    return await this.channelRepository.query(query);
  }

  public async changeCameraIpMapping(params: Map<string, any>) {
    const query = MybatisMapper.getStatement('Channel', 'changeCameraIpMapping', Object.fromEntries(params), myBatisFormat);
    return await this.channelRepository.query(query);
  }
}