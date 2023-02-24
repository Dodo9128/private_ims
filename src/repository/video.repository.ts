import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateVideoDto, UpdateVideoDto } from "../web/video/video.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Video } from '../entities/video.entity';
import { Row } from "exceljs";

@CustomRepository(Video)
export class GroupsRepository extends Repository<Video> {
  async setVideo(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }
}