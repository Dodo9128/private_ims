import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { IResultReturn } from "../../global/interface";
import { SYSTEM_ID } from "../../global/constant";
import { getNode4DSS } from "../decorator/fdss.decorator";

@Controller({ path: "4dss", version: ["v1"] })
@ApiTags("03. 4DSS >>> IMS")
export class FdssController {
  // TODO: add systemService on constructor;
  constructor() {}
  // constructor(
  //   private readonly systemService: SystemService;
  // ) {}

  @Get(`/:${SYSTEM_ID}/getNodes`)
  @getNode4DSS()
  async getNode4DSS(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    const result: IResultReturn = {
      result: "OK",
      message: "SUCCESS",
      data: { system_id: systemId },
    };

    return res.status(HttpStatus.OK).json(result);

    /**
     * TODO: connect with systemService.getSystemFor4DSS(systemId);
     *
     * const result: IResultReturn = await this.systemService.getSystemFor4DSS(systemId);
     * return res.status(HttpStatus.OK).json(result);
     */
  }
}
