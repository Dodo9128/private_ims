import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateGroupsDto, UpdateGroupsDto } from "./groups.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Groups } from '../entities/group.entity';
import {Row} from "exceljs";

@CustomRepository(Groups)
export class GroupsRepository extends Repository<Groups> {
  async makeGroupsId(systemId: string) {
    let tmpId;
    const tmpIds = await this.query(`SELECT CAST( IFNULL( MAX( RIGHT( id, 3 ) ), '000' ) AS UNSIGNED INTEGER ) + 1 as groupsId FROM groups WHERE id LIKE #{system_id}`);
    switch(tmpIds[0].groupsId.length) {
      case 1:
        tmpId = `${systemId}00${tmpIds[0].groupsId}`;
        break;
      case 2:
        tmpId = `${systemId}0${tmpIds[0].groupsId}`;
        break;
      case 3:
        tmpId = `${systemId}${tmpIds[0].groupsId}`;
        break;
    }
    return tmpId;
  }
  async getGroupChannelFor4DPD(query: string): Promise<Map<string, object>> {
    return await this.query(query);
  }

  async setGroup(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }

  async getList4Mng(query: string) {
    return await this.query(query);
  }


}