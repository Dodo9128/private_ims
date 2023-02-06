import { WorldService } from "./world.service";
import { Controller, Res, HttpStatus, Query, Post, Get } from "@nestjs/common";
import { ApiExcludeController, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { listWorldCity, listWorldCountry, listWorldState } from "../api/decorator/world.decorator";
import { IResultReturn } from "../interface/interface";

// @ApiExcludeController()
@Controller({ path: "worldCountry", version: ["v1"] })
// @Controller({ path: "4dpd", version: ["v1"], durable: true })
@ApiTags("WorldCountry / WorldState / WorldCity")
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Post("listWorldCountry")
  @listWorldCountry()
  async listWorldCountry(
    @Query("pageNo") pageNo: number,
    @Query("pageSize") pageSize: number,
    @Query("sortColumn") sortColumn: string,
    @Query("isDecending") isDecending: boolean,
    @Res() res: Response,
  ): Promise<Response> {
    const result: IResultReturn = await this.worldService.listWorldCountry(pageNo, pageSize, sortColumn, isDecending);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post("listWorldState")
  @listWorldState()
  async listWorldState(
    @Query("countryId") countryId: number,
    @Query("pageNo") pageNo: number,
    @Query("pageSize") pageSize: number,
    @Query("sortColumn") sortColumn: string,
    @Query("isDecending") isDecending: boolean,
    @Res() res: Response,
  ) {
    const result: IResultReturn = await this.worldService.listWorldState(
      countryId,
      pageNo,
      pageSize,
      sortColumn,
      isDecending,
    );
    return res.status(HttpStatus.OK).json(result);
  }

  @Post("listWorldCity")
  @listWorldCity()
  async listWorldCity(
    @Query("stateId") stateId: number,
    @Query("countryId") countryId: number,
    @Query("pageNo") pageNo: number,
    @Query("pageSize") pageSize: number,
    @Query("sortColumn") sortColumn: string,
    @Query("isDecending") isDecending: boolean,
    @Res() res: Response,
  ) {
    const result: IResultReturn = await this.worldService.listWorldCity(
      stateId,
      countryId,
      pageNo,
      pageSize,
      sortColumn,
      isDecending,
    );
    return res.status(HttpStatus.OK).json(result);
  }
}
