import { Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from "@nestjs/common";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { IResultReturn } from "../../global/interface";
import { SYSTEM_ID } from "../../global/constant";
import { getHealthCheck } from "../decorator/common.decorator";

@Controller({ path: "common", version: ["v1"] })
@ApiTags("07. COMMON")
export class CommonController {
  constructor() {}

  @Get(`/health`)
  @getHealthCheck()
  // TODO: change this logic_COMMON HealthCheck
  async getHealthCheck(@Res() res: Response) {
    const result: IResultReturn = {
      result: "ok",
      message: "SUCCESS",
      data: { health: true },
    };
    return res.status(HttpStatus.OK).json(result);
  }
}
