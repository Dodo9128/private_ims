import { InjectRepository } from "@nestjs/typeorm";
import { VenueRepository } from "./venue.repository";

import * as MybatisMapper from "mybatis-mapper";
import {Venue} from "../entities/venue.entity";
import {HttpException, HttpStatus} from "@nestjs/common";
import {PageUtil} from "../util/page.util";

MybatisMapper.createMapper(['./src/database/sqlmapper/Venue.xml'])

const myBatisFormat: object = { language: 'sql' };

export class VenueMapper {
  constructor(
    @InjectRepository(VenueRepository)
    private venueRepository: VenueRepository,
  ) {}

  async listVenue(params: Map<string, any>): Promise<Map<string, any>> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const totalCount: number = await this.listVenueCount(params);
    const query = MybatisMapper.getStatement('Venue', 'listVenue', Object.fromEntries(params), myBatisFormat);

    return PageUtil.setPageDataMap(await this.venueRepository.query(query), totalCount);
  }

  async getVenue(id: string): Promise<any> {
    let params = new Map<string, any>();
    params.set("id", id);
    const query = MybatisMapper.getStatement('Venue', 'getVenue', Object.fromEntries(params), myBatisFormat);

    return await this.venueRepository.query(query);
  }

  private async listVenueCount(params: Map<string, any>): Promise<number> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const query = MybatisMapper.getStatement("Venue", 'listVenueCount', Object.fromEntries(params), myBatisFormat);
    const Result = await this.venueRepository.query(query);

    return Result[0].cnt;
  }

  async deleteVenue(id: string): Promise<any> {
    return await this.venueRepository.onDelete(id);
  }

  /*
  * getMaxVenueId 는 사용하지 않는다.*/
  async getMaxVenueId(): Promise<number> {
    let params = new Map<string, any>();
    params.set("id", null);
    const query = MybatisMapper.getStatement('Venue', 'getMaxVenueId', Object.fromEntries(params), myBatisFormat);

    return await this.venueRepository.query(query);
  }

  async insertVenue(
    Data: Map<string, any>
  ): Promise<Venue> {
    try {
      let venue: Venue = new Venue();

      const venueId: string   = await this.venueRepository.makeVenueId();
      const eventCode = await this.venueRepository.makeEventCode(Data.get("event_yymm"), Data.get("event_name"), Data.get("country_id"))

      venue.id              = venueId;
      venue.country_id      = eventCode["id"];//Data.get("country_id");
      venue.state_id        = Data.get("state_id");
      venue.city_id         = Data.get("city_id");
      venue.event_name      = Data.get("event_name");
      venue.event_code      = eventCode["eventCode"];
      venue.name            = Data.get("name");
      venue.description     = Data.get("description");
      venue.timezone_name   = Data.get("timezone_name");
      venue.timezone_offset = Data.get("timezone_offset");
      venue.registered_at   = new Date(Date.now());

      return await this.venueRepository.save(venue);
    } catch (error) {
      throw new HttpException({
          message: 'SQL error',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateVenue(
    venueId: string,
    Data: Map<string, any>
  ): Promise<any> {
    let venue: Venue = new Venue();
    const eventCode = await this.venueRepository.makeEventCode(Data.get("event_yymm"), Data.get("event_name"), Data.get("country_id"))
    let tmpData = Object.assign(Object.fromEntries(Data), { event_code: eventCode["eventCode"], updated_at: new Date(Date.now())})

    return await this.venueRepository.update({id: venueId}, tmpData);
  }
}