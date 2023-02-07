import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { IResultReturn } from "../../global/interface";
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
  nodeIp44DML,
  getSystemFor4DML,
  get4DML,
  getScale44DML,
  scaleOut4DML,
  scaleOut4DMLOk,
  scaleIn4DML,
  getCFurl,
} from "../decorator/fdml.decorator";

@Controller({ path: "4dml", version: ["v1"] })
@ApiTags("05. 4DML >>> IMS")
export class FdmlController {
  // TODO: add systemService, nodeService, scaleService on constructor;
  constructor() {}
  // constructor(
  //   private readonly systemService: SystemService;
  //   private readonly nodeService: NodeService;
  //   private readonly scaleService: ScaleService;
  // ) {}

  @Get(`/:${EVENT_ID}/getCFurl`)
  @getCFurl()
  async getCFurl(@Param(`${EVENT_ID}`) eventId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: {
        event_id: eventId,
      },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with nodeService.getCFurl(eventId);
     *
     * const result: IResultReturn = await this.nodeService.getCFurl(eventId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Get(`:${SYSTEM_ID}/get4DML`)
  @get4DML()
  async get4DML(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
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
  @getScale44DML()
  async getScale44DML(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
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
      result: "OK",
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
  @nodeIp44DML()
  async nodeIp4DML(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with nodeService.nodeIp44dML(systemId);
     *
     * const result: IResultReturn = await this.nodeService.nodeIp44dML(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Delete(`/:${SYSTEM_ID}/scaleIn4DML/:${NODE_ID}/:${RS_ID}`)
  @scaleIn4DML()
  async scaleIn4DML(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${NODE_ID}`) nodeId: string,
    @Param(`${RS_ID}`) rsId: string,
    @Res() res: Response,
  ) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: {
        system_id: systemId,
        node_id: nodeId,
        rs_id: rsId,
      },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with nodeService.scaleIn4DML(systemId, nodeId, rsId);
     *
     * const result: IResultReturn = await this.nodeService.scaleIn4DML(systemId, nodeId, rsId);
     * return res.status(HttpStatus.OK).json(result);
     */
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
  ) {
    const result: IResultReturn = {
      result: "OK",
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
  ) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: {
        system_id: systemId,
        node_id: nodeId,
        rs_id: rsId,
        public_ip: publicIp,
        public_port: publicPort,
        domain: domain,
      },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with nodeService.scaleOut4DMLOk(systemId, nodeId, rsId, publicIp, publicPort, domain);
     *
     * const result: IResultReturn = await this.nodeService.scaleOut4DMLOk(systemId, nodeId, rsId, publicIp, publicPort, domain);
     * return res.status(HttpStatus.OK).json(result);
     */
  }
}
