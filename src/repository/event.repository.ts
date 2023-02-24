import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Event } from '../entities/event.entity';

@CustomRepository(Event)
export class EventRepository extends Repository<Event> {
  async listEvent(query) {
    const rst = this.query(query);
  }
}