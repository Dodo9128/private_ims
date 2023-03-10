import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateSystemDto, UpdateSystemDto } from "./system.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { System } from '../entities/system.entity';
import { Row } from "exceljs";
import * as Constant from "../global/constant";

@CustomRepository(System)
export class SystemRepository extends Repository<System> {
  async makeSystemId(venueId: string): Promise<string> {
    const query = `SELECT CHARACTER ( IFNULL ( ASCII ( MAX( RIGHT( id, 1 ) ) ) + 1, '65')) as systemId FROM system WHERE id LIKE'${venueId}%'`
    const tmpIds = await this.query(query);
    const tmpId = venueId + tmpIds[0].systemId;

    return tmpId
  };
  async onCreate(venueId: string, createSystemDto: CreateSystemDto): Promise<boolean> {
    const system_id: string = await this.makeSystemId(venueId);

    return true;
  }

  async listChannelFor4DPD(query: string): Promise<Map<string,object>> {
    return await this.query(query);
  }

  public async findByVenueId(venueId: string): Promise<any> {
    return await this.findBy({ venue_id: venueId });
  }
}