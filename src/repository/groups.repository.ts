import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateGroupsDto, UpdateGroupsDto } from "../web/groups/groups.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Groups } from '../entities/group.entity';
import {Row} from "exceljs";

@CustomRepository(Groups)
export class GroupsRepository extends Repository<Groups> {
  async getGroupChannelFor4DPD(query: string): Promise<Map<string, object>> {
    return await this.query(query);
  }

  async setGroup(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }

  async getList4Mng(query: string) {
    return await this.query(query);
  }
}