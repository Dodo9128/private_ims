import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { IResultReturn } from "../../global/interface";
import { nodeIp, get4DSS, getScale, scaleOut4DSS, scaleOut4DSSOk, scaleIn4DSS } from "../decorator/fdls.decorator";
import {
  DOMAIN,
  INITIAL_STATE,
  INSTANCE_ID,
  NODE_ID,
  PRIVATE_IP,
  PRIVATE_PORT,
  PUBLIC_IP,
  PUBLIC_PORT,
  REGION,
  SYSTEM_ID,
} from "../../global/constant";

// @ApiExcludeController()
@Controller({ path: "4dls", version: ["v1"] })
@ApiTags("04. 4DLS >>> IMS")
// @ApiResponse({ status: 200, description: "4DPD 에서 호출되는 API들" })
export class FdlsController {
  // TODO: add systemService, scaleService, nodeService on constructor;
  constructor() {}

  // constructor(
  //   private readonly systemService: SystemService;
  //   private readonly scaleService: ScaleService;
  //   private readonly nodeService: NodeService;
  // ) {}

  @Get(`/:${SYSTEM_ID}/get4DSS`)
  @get4DSS()
  async get4DSS(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with systemService.get4DSS(systemId);
     *
     * const result: IResultReturn = await this.systemService.get4DSS(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Get(`/:${SYSTEM_ID}/getScale`)
  @getScale()
  async getScale(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with scaleService.getScale44DLS(systemId);
     *
     * const result: IResultReturn = await this.scaleService.getScale44DLS(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Get(`/:${SYSTEM_ID}/nodeIp`)
  @nodeIp()
  async nodeIp(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with nodeService.nodeIp44DLS(systemId);
     *
     * const result: IResultReturn = await this.nodeService.nodeIp44DLS(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Delete(`/:${SYSTEM_ID}/scaleIn4dSS/:${NODE_ID}`)
  @scaleIn4DSS()
  async scaleIn4dSS(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${NODE_ID}`) nodeId: string,
    @Res() res: Response,
  ) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: {
        system_id: systemId,
        node_id: nodeId,
      },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with nodeService.scaleIn4DSS(systemId, nodeId);
     *
     * const result: IResultReturn = await this.nodeService.scaleIn4DSS(systemId, nodeId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Post(`/:${SYSTEM_ID}/scaleOut4DSS`)
  @scaleOut4DSS()
  async scaleOut4DSS(
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
     * TODO: connect with scaleService.scaleOut4DSS(systemId, instanceId, privateIp, privatePort, initialState, region);
     *
     * const result: IResultReturn = await this.scaleService.scaleOut4DSS(systemId, instanceId, privateIp, privatePort, initialState, region);
     * return res.status(HttpStatus.OK).json(result);
     */
  }

  @Put(`/:${SYSTEM_ID}/scaleOut4DSSOk/:${NODE_ID}`)
  @scaleOut4DSSOk()
  async scaleOut4DSSOk(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${NODE_ID}`) nodeId: string,
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
        public_ip: publicIp,
        public_port: publicPort,
        domain: domain,
      },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with nodeService.scaleOut4DSSOk(systemId, nodeId, publicIp, publicPort, domain);
     *
     * const result: IResultReturn = await this.nodeService.scaleOut4DSSOk(systemId, nodeId, publicIp, publicPort, domain);
     * return res.status(HttpStatus.OK).json(result);
     */
  }
}
