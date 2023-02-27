import { Controller, Param, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Express, Response } from "express";
import { IResultReturn } from "../global/interface";
import { exportCameraGroupExcel, exportVenueExcel } from "../api/decorator/excel.decorator";
import { ExcelService } from "./excel.service";
import { SYSTEM_ID, VENUE_ID } from "../global/constant";

@Controller({ path: "excel", version: ["v1"] })
@ApiTags("99. EXCEL EXPORT")
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post(`/venueExport/:${VENUE_ID}/:${SYSTEM_ID}`)
  @exportVenueExcel()
  async exportVenueExcel(
    @Param(`${VENUE_ID}`) venueId: string,
    @Param(`${SYSTEM_ID}`) systemId: string,
    @Res() res: Response,
  ) {
    await this.excelService.exportVenueExcel(venueId, systemId, res);
  }

  @Post(`/cameraGroupExport/:${SYSTEM_ID}`)
  @exportCameraGroupExcel()
  async exportCameraGroupExcel(@Param(`${SYSTEM_ID}`) systemId: string, @Res() res: Response) {
    // const result = await this.excelService.exportCameraGroupExcel(systemId, res);
    // return result;
    await this.excelService.exportCameraGroupExcel(systemId, res);
  }
}
