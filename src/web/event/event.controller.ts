import {
  Body, Post, Controller
} from "@nestjs/common";
import { EventService } from "./event.service";

@Controller("web/event")
export class EventController {
  constructor(
    private readonly eventService: EventService,
  ) {}

  @Post('/listEvent4Mng')
  postEventList4Mng(@Body('system_id') system_id: string): object {
    return this.eventService.postEventList4Mng(system_id);
  }
}