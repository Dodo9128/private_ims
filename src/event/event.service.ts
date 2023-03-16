import { Injectable } from '@nestjs/common';
import { EventRepository } from "./event.repository";
import { CreateEventDto, UpdateEventDto } from "./event.dto";
import { Event } from '../entities/event.entity';

import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/Event.xml']);

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
  ) {
  }
  async postEventList4Mng(system_id: string): Promise<object> {
    let param = {
      system_id: system_id
    };

    const query = MybatisMapper.getStatement('Event', 'listEvent', param, {language: 'sql', indent: ' '});
    const data: any = await this.eventRepository.listEvent(query);

    return {
      data: data[0]
    }
  }
}