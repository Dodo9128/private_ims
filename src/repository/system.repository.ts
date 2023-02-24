import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateSystemDto, UpdateSystemDto } from "../web/system/system.dto";
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

  async getSystemInfo(id: string): Promise<any> {
    return id;
  }

  async listChannelFor4DPD(query: string): Promise<Map<string,object>> {
    return await this.query(query);
  }

  async setSystem(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    let system_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_ID) as number).toString();
    let name = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_NAME) as number).toString();
    let description = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_DESCRIPTION) as number).toString();

    let fps:number = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_FPS) as number);
    let width:number = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_WIDTH) as number);
    let height:number = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_HEIGHT) as number);
    let comment = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_COMMENT) as number).toString();
    let is_extra = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SYSTEM_IS_EXTRA) as number).toString();

    let tmpData: object;

    if (newOne) { //신규
      tmpData = {
        id: systemId,
        registered_at: new Date(Date.now()),
      }
    } else { //update
      tmpData = {
        updated_at: new Date(Date.now())
      }
    }

    Object.assign(tmpData, {
      name, description, "fps": parseFloat(String(fps)), width, height, comment, is_extra, venue_id: venueId
    })

    const result = (newOne) ? await this.save(tmpData) : await this.update({id: systemId}, tmpData);

    return result;
  }
}