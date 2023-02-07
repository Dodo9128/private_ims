import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { getNode4DRS } from "../decorator/api.decorator";
import { IResultReturn } from "../../interface/interface";

// @ApiExcludeController()
@Controller({ path: "4drs", version: ["v1"], durable: true })
@ApiTags("02. 4DRS >>> IMS")
// @ApiResponse({ status: 200, description: "4DPD 에서 호출되는 API들" })
export class FdrsController {
  // TODO: add systemService, nodeService on constructor;
  constructor() {}
  // constructor(
  //   private readonly systemService: SystemService;
  //   private readonly nodeService: NodeService;
  // ) {}

  // 노출 안되는 API는 ApiExcludeEndpoint() 로 가리거나, 컨트롤러 자체를 ApiExcludeController()로 가린다
  @Get("/:system_id/getNodes")
  @getNode4DRS()
  async getNode4DRS(@Param("system_id") systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with systemService.getSystemFor4DRS(systemId);
     *
     * const result: IResultReturn = await this.systemService.getSystemFor4DRS(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }
}
