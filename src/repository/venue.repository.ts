import { HttpStatus, HttpException, NotFoundException } from "@nestjs/common";
import { CreateVenueDto, UpdateVenueDto } from "../web/venue/venue.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Venue } from '../entities/venue.entity';
import { Row } from "exceljs";
import * as Constant from "../global/constant";

@CustomRepository(Venue)
export class VenueRepository extends Repository<Venue> {
  async findAll(query: string): Promise<object> {
    return await this.query(query);
  }
  async makeEventCode(ev_yymm: string, ev_name: string, cid: number): Promise<any> {
    const iso3 = await this.query(`SELECT iso3 FROM ims.world_country WHERE id=${cid}`)
    return `${ev_yymm}-${iso3[0].iso3}-${ev_name.toUpperCase()}`;
  }
  async makeVenueId(): Promise<string> {
    let tmpId: string;
    let query: string;
    query = "SELECT CAST( IFNULL( MAX( id ), '0000' ) AS UNSIGNED INTEGER ) + 1 as venueId FROM venue";
    const tmpIds = await this.query(query);
    switch(tmpIds[0].venueId.length) {
      case 1:
        tmpId = '000' + tmpIds[0].venueId;
        break;
      case 2:
        tmpId = '00' + tmpIds[0].venueId;
        break;
      case 3:
        tmpId = '0' + tmpIds[0].venueId;
        break;
      default:
        tmpId = tmpIds[0].venueId;
    }
    return tmpId
  };
  async onCreate(createVenueDto: CreateVenueDto): Promise<object> {
    try {
      const venue_id = await this.makeVenueId();
      const {
        country_id,
        state_id,
        city_id,
        event_name,
        event_yymm,
        name,
        description,
        comment,
        timezone_name,
        timezone_offset
      } = createVenueDto;
      const event_code = await this.makeEventCode(event_yymm, event_name, country_id);
      const tmpData = {
        id: venue_id,
        country_id,
        state_id,
        city_id,
        event_name,
        event_code,
        name,
        description,
        comment,
        timezone_name,
        timezone_offset,
        registered_at: new Date(Date.now())
      }

      return await this.save(tmpData);
    } catch (error) {
      throw new HttpException({
          message: 'SQL error',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  };

  async onUpdate(id: string, updateVenueDto:UpdateVenueDto): Promise<object> {
    const {
      country_id,
      state_id,
      city_id,
      event_name,
      event_yymm,
      name,
      description,
      comment,
      timezone_name,
      timezone_offset
    } = updateVenueDto;
    const event_code = await this.makeEventCode(event_yymm, event_name, country_id);
    const tmpData = {
      country_id,
      state_id,
      city_id,
      event_name,
      event_code,
      name,
      description,
      comment,
      timezone_name,
      timezone_offset,
      updated_at: new Date(Date.now()),
    }

    const venue = await this.update({id}, tmpData);
    if (venue.affected !== 1) {
      throw new NotFoundException('베뉴 정보가 없ㅅ브니다.');
    }

    return venue;
  };

  async onDelete(id: string): Promise<boolean> {
    const rstDeleteVenue = await this.delete(id);

    if (rstDeleteVenue.affected === 0 ) {
      throw new NotFoundException('Venue가 존재하지 않습니다.');
    }

    return true;
  }

  async findById(query: string): Promise<object> {
    const venue = await this.query(query);

    if (!venue) {
      throw new HttpException(
        {
          message: 1,
          error: "찾을 수 없는 베뉴입니다."
        },
        HttpStatus.NOT_FOUND,
      )
    }
    return venue[0];
  }

  async getCountryId(code: string): Promise<object> {
    return await this.query(`SELECT id from ims.world_country WHERE code=${code}`)
  }

  async setVenue(rows: Row, cellIndexMap: Map<string, number>, venueId: string, newOne: boolean) {
    const venue_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_ID) as number).toString()
    const country_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_COUNTRY_ID) as number).toString();
    const state_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_STATE_ID) as number).toString();
    const city_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_CITY_ID) as number).toString();
    const event_name = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_EVENT_NAME) as number).toString();
    const event_yymm = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_EVENT_YYMM) as number).toString();
    const name = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_NAME) as number).toString();
    const description = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_DESCRIPTION) as number).toString();
    const timezone_name = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_TIMZONE_NAME) as number).toString();
    const timezone_offset = rows.getCell(cellIndexMap.get(Constant.COL_KEY_VENUE_TIMEZONE_OFFSET) as number).toString();

    const cid = await this.getCountryId(country_id); //country_id 가져오기
    const event_code = await this.makeEventCode(event_yymm, event_name, cid[0].id); //이벤트 코드 생성

    let tmpData: object;

    if (newOne) { //신규
      tmpData = {
        id: venueId,
        registered_at: new Date(Date.now()),
      }
    } else { //update
      tmpData = {
        updated_at: new Date(Date.now())
      }
    }

    Object.assign(tmpData, {
      "country_id": cid[0].id,
      event_code,
      "state_id": (state_id) ? parseInt(state_id) : 0,
      "city_id": (city_id) ? parseInt(city_id) : 0,
      event_name,
      name,
      description,
      timezone_name,
      timezone_offset,
    })

    const result = (newOne) ? await this.save(tmpData) : await this.update({id: venueId}, tmpData);

    return result;
  }
}
