import {
  Body, Post, Controller
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto, UpdateEventDto} from "./event.dto";

@Controller("web/event")
export class EventController {
  constructor(
    private readonly eventService: EventService,
  ) {}

  @Post('/listEvent4Mng')
  postEventList4Mng(@Body('system_id') system_id: string): object {
    return this.eventService.postEventList4Mng(system_id);
  }

  @Post('/insertEvent')
  insertEvent(
    @Body() createEventDto: CreateEventDto,
  ) {
    // return this.eventService.insertEvent(createEventDto);
  }

  @Post('/updateEvent')
  updateEvent(
    @Body() updateEventDto: UpdateEventDto,
  ) {
    // return this.eventService.updateEvent(updateEventDto)
  }

  @Post('/deleteEvent')
  deleteEvent(
    @Body('id') id: string,
  ) {
    //return this.eventService.deleteEvent(id);
  }
}