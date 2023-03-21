import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { getNode } from "../decorator/fdrs.decorator";
import { IResultReturn } from "../../global/interface";
import { SYSTEM_ID } from "../../global/constant";
import { NodeService } from "../../node/node.service";

// @ApiExcludeController()
@Controller({ path: "4drs", version: ["v1"] })
@ApiTags("02. 4DRS >>> IMS")
// @ApiResponse({ status: 200, description: "4DPD 에서 호출되는 API들" })
export class FdrsController {
  // TODO: add systemService, nodeService on constructor;
  // constructor() {}
  constructor(
    // private readonly systemService: SystemService;
    private readonly nodeService: NodeService,
  ) {}

  // 노출 안되는 API는 ApiExcludeEndpoint() 로 가리거나, 컨트롤러 자체를 ApiExcludeController()로 가린다
  @Get(`/:${SYSTEM_ID}/getNodes`)
  @getNode()
  async getNode(@Param(SYSTEM_ID) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "ok",
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
