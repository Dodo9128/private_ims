import { Controller, Param, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Express, Response } from "express";
import { IResultReturn } from "../global/interface";
import { venueExcelExport } from "../api/decorator/excel.decorator";
import { ExcelService } from "./excel.service";
import { SYSTEM_ID, VENUE_ID } from "../global/constant";

@Controller({ path: "excel", version: ["v1"] })
@ApiTags("99. EXCEL EXPORT")
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post(`/venueExport/:${VENUE_ID}/:${SYSTEM_ID}`)
  @venueExcelExport()
  async excelExport(
    @Param(`${VENUE_ID}`) venueId: string,
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Res() res: Response,
  ) {
    await this.excelService.exportExcel(venueId, systemId, res);
  }
}
