import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateChannelDto, UpdateChannelDto } from "../web/channel/channel.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Channel } from '../entities/channel.entity';
import { Row } from "exceljs";

@CustomRepository(Channel)
export class ChannelRepository extends Repository<Channel> {
  async setChannel(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }

  async lstChannel4Mng(query) {
    return await this.query(query);
  }
}