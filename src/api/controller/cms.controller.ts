import { Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { IResultReturn } from "../../global/interface";
import { CONTENT_ID, EVENT_ID, SCHEDULED_AT, SYSTEM_ID } from "../../global/constant";
import {
  getLiveEventId,
  makeNewNotLiveEvent,
  getGroupChannelForMobile,
  updateContentIdByEventId,
} from "../decorator/cms.decorator";
import { EventService } from "../../event/event.service";
import { GroupsService } from "../../groups/groups.service";

@Controller({ path: "cms", version: ["v1"] })
@ApiTags("06. CMS >>> IMS")
export class CmsController {
  // TODO: add eventService, groupService on constructor;
  // constructor() {}

  constructor(private readonly eventService: EventService, private readonly groupService: GroupsService) {}

  @Get(`/:${SYSTEM_ID}/getGroupChannelForMobile`)
  @getGroupChannelForMobile()
  async getGroupChannelForMobile(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with groupService.getGroupChannelForMobile(systemId);
     *
     * const result: IResultReturn = await this.groupService.getGroupChannelForMobile(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Get(`/:${SYSTEM_ID}/getLiveEventId`)
  @getLiveEventId()
  async getLiveEventId(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with eventService.getLiveEventId(systemId);
     *
     * const result: IResultReturn = await this.eventService.getLiveEventId(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Post(`/:${SYSTEM_ID}/makeNewNotLiveEvent`)
  @makeNewNotLiveEvent()
  async makeNewNotLiveEvent(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${CONTENT_ID}`) contentId: number,
    @Query(`${SCHEDULED_AT}`) scheduledAt: string,
    @Res() res: Response,
  ) {
    contentId ||= 0;
    scheduledAt ||= null;
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId, content_id: contentId, scheduled_at: scheduledAt },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with eventService.makeNewNotLiveEvent(systemId, contentId, scheduledAt);
     *
     * const result: IResultReturn = await this.eventService.makeNewNotLiveEvent(systemId, contentId, scheduledAt);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Post(`/:${SYSTEM_ID}/updateContentIdByEventId`)
  @updateContentIdByEventId()
  async updateContentIdByEventId(
    @Req() req: Request,
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Query(`${EVENT_ID}`) eventId: string,
    @Query(`${CONTENT_ID}`) contentId: number,
    @Res() res: Response,
  ) {
    const reqParams = req.params;
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { request_params: reqParams, system_id: systemId, event_id: eventId, content_id: contentId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with eventService.updateContentIdByEventId(reqParams, systemId, eventId, contentId);
     *
     * const result: IResultReturn = await this.eventService.updateContentIdByEventId(reqParams, systemId, eventId, contentId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }
}
