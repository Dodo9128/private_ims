import { Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
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
import { NodeService } from "../../node/node.service";
import { NetworkUtil } from "../../util/network.util";
import { sendOk } from "../../libs/utils/functionReturn";

// @ApiExcludeController()
@Controller({ path: "4dls", version: ["v1"] })
@ApiTags("04. 4DLS >>> IMS")
// @ApiResponse({ status: 200, description: "4DPD 에서 호출되는 API들" })
export class FdlsController {
  // TODO: add systemService, scaleService, nodeService on constructor;
  // constructor() {}

  constructor(
    // private readonly systemService: SystemService;
    // private readonly scaleService: ScaleService;
    private readonly nodeService: NodeService,
  ) {}

  @Get(`/:${SYSTEM_ID}/get4DSS`)
  @get4DSS()
  async get4DSS(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "ok",
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
      result: "ok",
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
  async nodeIp(@Param(`${SYSTEM_ID}`) systemId: string, @Req() req: Request, @Res() res: Response) {
    const srcServerIp: string = NetworkUtil.getRemoteIP(req);
    const nodeIp44DMLReturn = await this.nodeService.nodeIp44DLS(srcServerIp, systemId);

    const result: IResultReturn = sendOk("SUCCESS", { node: nodeIp44DMLReturn });

    return res.status(HttpStatus.OK).json(result);
  }

  @Delete(`/:${SYSTEM_ID}/scaleIn4dSS/:${NODE_ID}`)
  @scaleIn4DSS()
  async scaleIn4dSS(
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Param(`${NODE_ID}`) nodeId: string,
    @Res() res: Response,
  ) {
    const scaleIn4DSSReturn = await this.nodeService.scaleIn4DSS(systemId, nodeId);
    const result: IResultReturn = sendOk("SUCCESS", scaleIn4DSSReturn);

    return res.status(HttpStatus.OK).json(result);
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
    const scaleOut4DSSOkReturn = await this.nodeService.scaleOut4DSSOk(systemId, nodeId, publicIp, publicPort, domain);
    const result: IResultReturn = sendOk("SUCCESS", scaleOut4DSSOkReturn);

    return res.status(HttpStatus.OK).json(result);
  }
}
