import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiResponse, ApiTags } from "@nestjs/swagger";
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
} from "../decorator/api.decorator";
import { IResultReturn } from "../../interface/interface";

/**
 * comment for connect on Jira
 */

// @ApiExcludeController()
// @Controller("4dpd")
@Controller({ path: "4dpd", version: ["v1"], durable: true })
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
    @Query("system_id") systemId: string,
    @Query("channel_list") channelList: string,
    @Res() res: Response,
  ) {
    channelList = JSON.parse(channelList);

    const result: IResultReturn = {
      result: "OK",
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

  @Post("/:system_id/:event_id/:status/setEventStatus")
  @setEventStatus()
  async setEventStatus(
    @Param("system_id") systemId: string,
    @Param("event_id") eventId: string,
    @Param("status") status: string,
    @Res() res: Response,
  ) {
    const result: IResultReturn = {
      result: "OK",
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

  @Post("/:system_id/:event_id/makeContent")
  @makeContent()
  async makeContent(
    @Param("system_id") systemId: string,
    @Param("event_id") eventId: string,
    @Query("param") param: string,
    @Res() res: Response,
  ) {
    param = JSON.parse(param);
    const result: IResultReturn = {
      result: "OK",
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

  @Post("/:system_id/:event_id/makeHlsContent")
  @makeHlsContent()
  async makeHlsContent(
    @Param("system_id") systemId: string,
    @Param("event_id") eventId: string,
    @Query("param") param: string,
    @Res() res: Response,
  ) {
    param = JSON.parse(param);
    const result: IResultReturn = {
      result: "OK",
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

  @Post("/:system_id/:event_id/reSet")
  @reSet()
  async reSet(
    @Param("system_id") systemId: string,
    @Param("event_id") eventId: string,
    @Query("scheduled_at") scheduledAt: string,
    @Res() res: Response,
  ) {
    const result: IResultReturn = {
      result: "OK",
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

  @Post("/:system_id/:live_index/:status/setChannelStatus")
  @setChannelStatus()
  async setChannelStatus(
    @Param("system_id") systemId: string,
    @Param("live_index") liveIndex: number,
    @Param("status") status: string,
    @Res() res: Response,
  ) {
    const result: IResultReturn = {
      result: "OK",
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

  @Get("/:system_id/getEventId")
  @getEventId()
  async getEventId(@Param("system_id") systemId: string, @Res() res: Response) {
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

  @Get("/:system_id/getGroupChannel")
  @getGroupChannel()
  async getGroupChannel(@Param("system_id") systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
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
