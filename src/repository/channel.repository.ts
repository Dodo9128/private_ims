import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateChannelDto, UpdateChannelDto } from "../web/channel/channel.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Channel } from '../entities/channel.entity';
import { Row } from "exceljs";

@CustomRepository(Channel)
export class GroupsRepository extends Repository<Channel> {
  async setAudio(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }
}