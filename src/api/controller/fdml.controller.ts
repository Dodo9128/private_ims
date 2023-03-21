import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { IResultReturn } from "../../global/interface";
import { sendOk } from "../../libs/utils/functionReturn";
import {
  DOMAIN,
  EVENT_ID,
  INITIAL_STATE,
  INSTANCE_ID,
  NODE_ID,
  PRIVATE_IP,
  PRIVATE_PORT,
  PUBLIC_IP,
  PUBLIC_PORT,
  REGION,
  RS_ID,
  SYSTEM_ID,
} from "../../global/constant";
import {
  nodeIp,
  getSystemFor4DML,
  get4DML,
  getScale,
  scaleOut4DML,
  scaleOut4DMLOk,
  scaleIn4DML,
  getCFurl,
} from "../decorator/fdml.decorator";
import { NodeService } from "../../node/node.service";
import { NetworkUtil } from "../../util/network.util";

@Controller({ path: "4dml", version: ["v1"] })
@ApiTags("05. 4DML >>> IMS")
export class FdmlController {
  // TODO: add systemService, nodeService, scaleService on constructor;
  // constructor() {}
  constructor(
    //   private readonly systemService: SystemService;
    private readonly nodeService: NodeService, //   private readonly scaleService: ScaleService;
  ) {}

  @Get(`/:${EVENT_ID}/getCFurl`)
  @getCFurl()
  async getCFurl(@Param(`${EVENT_ID}`) eventId: string, @Res() res: Response): Promise<Response> {
    const eventIdObj: Map<string, string> = new Map<string, string>();
    eventIdObj.set("event_id", eventId);

    const cfUrl: Promise<string> = await this.nodeService.getCFurl(eventIdObj);

    const result: IResultReturn = sendOk("SUCCESS", { domain: cfUrl });

    return res.status(HttpStatus.OK).json(result);
  }

  @Get(`:${SYSTEM_ID}/get4DML`)
  @get4DML()
  async get4DML(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with systemService.get4DML(systemId);
     *
     * const result: IResultReturn = await this.systemService.get4DML(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Get(`/:${SYSTEM_ID}/getScale`)
  @getScale()
  async getScale(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with scaleService.getScale44DML(systemId);
     *
     * const result: IResultReturn = await this.scaleService.getScale44DML(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Get(`/:${SYSTEM_ID}/getSystemInfo`)
  @getSystemFor4DML()
  async getSystemFor4DML(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with systemService.getSystemFor4DML(systemId);
     *
     * const result: IResultReturn = await this.systemService.getSystemFor4DML(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Get(`/:${SYSTEM_ID}/nodeIp`)
  @nodeIp()
  async nodeIp(@Param(`${SYSTEM_ID}`) systemId: string, @Req() req: Request, @Res() res: Response): Promise<Response> {
    const srcServerIp = NetworkUtil.getRemoteIP(req);
    const nodeIp44DMLResult = await this.nodeService.nodeIp44DML(srcServerIp, systemId);

    const result: IResultReturn = sendOk("SUCCESS", { node: nodeIp44DMLResult });

    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(`/:${SYSTEM_ID}/scaleIn4DML/:${NODE_ID}/:${RS_ID}`)
  @scaleIn4DML()
  async scaleIn4DML(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${NODE_ID}`) nodeId: string,
    @Param(`${RS_ID}`) rsId: string,
    @Res() res: Response,
  ): Promise<Response> {
    const scaleIn4DMLReturn = await this.nodeService.scaleIn4DML(systemId, nodeId, rsId);

    const result: IResultReturn = sendOk("SUCCESS", scaleIn4DMLReturn);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post(`/:${SYSTEM_ID}/scaleOut4DML`)
  @scaleOut4DML()
  async scaleOut4DML(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Query(`${INSTANCE_ID}`) instanceId: string,
    @Query(`${PRIVATE_IP}`) privateIp: string,
    @Query(`${PRIVATE_PORT}`) privatePort: string,
    @Query(`${INITIAL_STATE}`) initialState: string,
    @Query(`${REGION}`) region: string,
    @Res() res: Response,
  ): Promise<Response> {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: {
        system_id: systemId,
        instance_id: instanceId,
        private_ip: privateIp,
        private_port: privatePort,
        initial_state: initialState,
        region: region,
      },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with scaleService.scaleOut4DML(systemId, instanceId, privateIp, privatePort, initialState, region);
     *
     * const result: IResultReturn = await this.scaleService.scaleOut4DML(systemId, instanceId, privateIp, privatePort, initialState, region);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Put(`/:${SYSTEM_ID}/scaleOut4DMLOk/:${NODE_ID}/:${RS_ID}`)
  @scaleOut4DMLOk()
  async scaleOut4DMLOk(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${NODE_ID}`) nodeId: string,
    @Param(`${RS_ID}`) rsId: string,
    @Query(`${PUBLIC_IP}`) publicIp: string,
    @Query(`${PUBLIC_PORT}`) publicPort: string,
    @Query(`${DOMAIN}`) domain: string,
    @Res() res: Response,
  ): Promise<Response> {
    const scaleOut4DMLOkReturn = await this.nodeService.scaleOut4DMLOk(
      systemId,
      nodeId,
      rsId,
      publicIp,
      publicPort,
      domain,
    );

    const result: IResultReturn = sendOk("SUCCESS", scaleOut4DMLOkReturn);

    return res.status(HttpStatus.OK).json(result);
  }
}
