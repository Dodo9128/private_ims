import {EventRepository} from "./event.repository";

import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/Event.xml'])
const myBatisFormat: object = { language: 'sql' };

export class EventMapper {
  constructor(
    private readonly eventRepository: EventRepository,
  ) {}

  public async listEvent(params: Map<any, any>): Promise<string> {
    let retList = new Map<string, any>();
    const totalCountQ = MybatisMapper.getStatement('Event', 'listEventCount', Object.fromEntries(params), myBatisFormat);
    const totalCount = await this.eventRepository.query(totalCountQ);
    console.log(totalCount)
    if (totalCount) {
      const query = MybatisMapper.getStatement('Event', 'listEvent', Object.fromEntries(params), myBatisFormat);
      retList = await this.eventRepository.query(query);
    }

    return
  }

  public async getMaxEventId(params: Map<any, any>): Promise<number> {
    const query = MybatisMapper.getStatement('Event', 'getMaxEventId', Object.fromEntries(params), myBatisFormat);
    return await this.eventRepository.query(query);
  }

  public async getNextEventId(params: Map<any, any>): Promise<string> {
    const query = MybatisMapper.getStatement('Event', 'getNextEventId', Object.fromEntries(params), myBatisFormat);
    return await this.eventRepository.query(query);
  }

  public async updateContentIdByEventId(params: Map<any, any>): Promise<number> {
    const query = MybatisMapper.getStatement('Event', 'updateContentIdByEventId', Object.fromEntries(params), myBatisFormat);
    return await this.eventRepository.query(query);
  }

  public async getEvent4Mng(params: Map<any, any>): Promise<any> {
    const query = MybatisMapper.getStatement('Event', 'getEvent4Mng', Object.fromEntries(params), myBatisFormat);
    return await this.eventRepository.query(query);
  }

  public async getSystemId(params: Map<any, any>): Promise<string> {
    const query = MybatisMapper.getStatement('Event', 'getSystemId', Object.fromEntries(params), myBatisFormat);
    return await this.eventRepository.query(query);
  }

}
