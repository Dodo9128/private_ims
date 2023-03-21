import { Controller, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import {
  getGroupChannel,
  insertChannelIP,
  getEventId,
  setEventStatus,
  reSet,
  makeContent,
  setChannelStatus,
  makeHlsContent,
} from "../decorator/fdpd.decorator";
import { IResultReturn } from "../../global/interface";
import { SYSTEM_ID, EVENT_ID, STATUS, LIVE_INDEX, PARAM, SCHEDULED_AT } from "../../global/constant";

// @ApiExcludeController()
@Controller({ path: "4dpd", version: ["v1"] })
@ApiTags("01. 4DPD >>> IMS")
// @ApiResponse({ status: 200, description: "4DPD 에서 호출되는 API들" })
export class FdpdController {
  // TODO: add channelService, venueService, systemService, eventService on constructor;
  constructor() {}
  // constructor(
  //   private readonly channelService: ChannelService;
  //   private readonly eventService: EventService;
  //   private readonly systemService: SystemService;
  //   private readonly venueService: VenueService;
  // ) {}

  // 노출 안되는 API는 ApiExcludeEndpoint() 로 가리거나, 컨트롤러 자체를 ApiExcludeController()로 가린다
  @ApiExcludeEndpoint()
  @Post("/insertChannelIP")
  @insertChannelIP()
  async insertChannelIP(
    @Query(`${SYSTEM_ID}`) systemId: string,
    @Query("channel_list") channelList: string,
    @Res() res: Response,
  ) {
    channelList = JSON.parse(channelList);

    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId, channelList: channelList },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with channelService.insertChannelIP(param);
     *
     * const params = {
     *       system_id: systemId,
     *       channel_list: channelList,
     *     };
     *
     * const result: IResultReturn = await this.channelService.insertChannelIP(params);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Post(`/:${SYSTEM_ID}/:${EVENT_ID}/:${STATUS}/setEventStatus`)
  @setEventStatus()
  async setEventStatus(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${EVENT_ID}`) eventId: string,
    @Param(`${STATUS}`) status: string,
    @Res() res: Response,
  ) {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId, event_id: eventId, status: status },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with eventService.setEventStatus(systemId, eventId, status);
     *
     * const result: IResultReturn = await this.eventService.setEventStatus(systemId, eventId, status)
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Post(`/:${SYSTEM_ID}/:${EVENT_ID}/makeContent`)
  @makeContent()
  async makeContent(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${EVENT_ID}`) eventId: string,
    @Query(`${PARAM}`) param: string,
    @Res() res: Response,
  ) {
    param = JSON.parse(param);
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId, event_id: eventId, param: param },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with eventService.makeContent(systemId, eventId, param);
     *
     * const result: IResultReturn = await this.eventService.reSet(systemId, eventId, param)
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Post(`/:${SYSTEM_ID}/:${EVENT_ID}/makeHlsContent`)
  @makeHlsContent()
  async makeHlsContent(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${EVENT_ID}`) eventId: string,
    @Query(`${PARAM}`) param: string,
    @Res() res: Response,
  ) {
    param = JSON.parse(param);
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId, event_id: eventId, param: param },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with eventService.makeHlsContent(systemId, eventId, param);
     *
     * const result: IResultReturn = await this.eventService.makeHlsContent(systemId, eventId, param)
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Post(`/:${SYSTEM_ID}/:${EVENT_ID}/reSet`)
  @reSet()
  async reSet(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${EVENT_ID}`) eventId: string,
    @Query(`${SCHEDULED_AT}`) scheduledAt: string,
    @Res() res: Response,
  ) {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId, event_id: eventId, scheduled_at: scheduledAt },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with eventService.reSet(systemId, eventId);
     *
     * const result: IResultReturn = await this.eventService.reSet(systemId, eventId)
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Post(`/:${SYSTEM_ID}/:${LIVE_INDEX}/:${STATUS}/setChannelStatus`)
  @setChannelStatus()
  async setChannelStatus(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${LIVE_INDEX}`) liveIndex: number,
    @Param(`${STATUS}`) status: string,
    @Res() res: Response,
  ) {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId, live_index: liveIndex, status: status },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with channelService.setChannelStatus(systemId, liveIndex, status);
     *
     * const result: IResultReturn = await this.channelService.setChannelStatus(systemId, liveIndex, status)
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Get(`/:${SYSTEM_ID}/getEventId`)
  @getEventId()
  async getEventId(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "ok",
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

  @Get(`/:${SYSTEM_ID}/getGroupChannel`)
  @getGroupChannel()
  async getGroupChannel(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with systemService.getSystemFor4DPD(systemId);
     *
     * const result: IResultReturn = await this.systemService.getSystemFor4DPD(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }
}
