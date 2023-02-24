import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateAudioDto, UpdateAudioDto } from "../web/audio/audio.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Audio } from '../entities/audio.entity';
import { Row } from "exceljs";

@CustomRepository(Audio)
export class AudioRepository extends Repository<Audio> {
  async setAudio(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {

  }
}