import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateGroupsDto, UpdateGroupsDto } from "../web/groups/groups.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Group } from '../entities/group.entity';
import {Row} from "exceljs";

@CustomRepository(Group)
export class GroupsRepository extends Repository<Group> {
  async getGroupChannelFor4DPD(query: string): Promise<Map<string, object>> {
    return await this.query(query);
  }

  async setGroup(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }
}