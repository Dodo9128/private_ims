import {
  Controller,
  Res,
  Req,
  Post,
  Body,
  HttpStatus,
  UseInterceptors,
  Bind,
  UploadedFiles,
  Query
} from '@nestjs/common';
import { Response, Request } from 'express';
import { VenueService } from "../venue/venue.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerMemoryOptions } from "../libs/utils/multer.options";

// import { CreateVenueDto, UpdateVenueDto } from "./venue/venue.dto";
@Controller('web/venue')
export class WebVenueController {
  constructor(
    private venueService: VenueService,
  ) {}

  @Post('/listVenue4Mng')
  async listVenue4Mng(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('sortColumn') sortColumn: string,
    @Query('isDescending') isDescending: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("pageNo", (pageNo) ? pageNo : 1)
      .set("pageSize", (pageSize) ? pageSize : 9999)
      .set("sortColumn", (sortColumn) ? sortColumn : "id")
      .set("isDescending", (isDescending) ? isDescending : "asc")

    const Result: Map<string, any> = await this.venueService.listVenue4Mng(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listVenue')
  async listVenue(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('sortColumn') sortColumn: string,
    @Query('isDescending') isDescending: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("pageNo", (pageNo) ? pageNo : 1)
      .set("pageSize", (pageSize) ? pageSize : 9999)
      .set("sortColumn", (sortColumn) ? sortColumn : "id")
      .set("isDescending", (isDescending) ? isDescending : "asc")

    const Result: Map<string, any> = await this.venueService.listVenue(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/getVenue')
  getVenue(@Body('id') id: string, @Res() res: Response) {
    return this.venueService.getVenue(id).then((rst) => {
      res.status(HttpStatus.OK).json({
        data: rst,
        result: "ok",
        message: "SUCCESS"
      })
    });
  }

  @Post('/uploadIMSExcel')
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOptions))
  @Bind(UploadedFiles())
  async uploadFileMemory(
    files: File[],
    @Body('venue_id') venue_id: string,
    @Body('system_id') system_id: string,
    @Body('venue_delete') venue_delete: string,
    @Res() res: Response,
  ) {
    this.venueService.uploadFileMemory(venue_id, system_id, venue_delete, files)
      .then(result => {
        //console.log(result)
      });

    res.status(HttpStatus.OK).json({
      data: "",
      result: "ok",
      message: "SUCCESS"
    })
  }

  /**
   * 나중에 작업 웹 프론트에서는 위만 사용한다.
  @Post('/insertVenue')
  insertVenue(@Res() res: Response, @Body() createVenueDto: CreateVenueDto) {
    return this.venueService.insertVenue(createVenueDto).then((rst) => {
      res.status(HttpStatus.OK).json({
        data: rst,
        result: "ok",
        message: "SUCCESS"
      });
    });
  }

  @Post('/updateVenue')
  updateVenue(@Res() res: Response, @Body('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.updateVenue(id, updateVenueDto).then((rst) => {
      res.status(HttpStatus.OK).json({
        data: [],
        result: "ok",
        message: "SUCCESS"
      });
    })
  }

  @Post('/listVenue')
  listVenue(
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.venueService.listVenue(req).then(rst => {
      res.status(HttpStatus.OK).json({
        data: rst,
        result: "ok",
        message: "SUCCESS"
      })
    });
  }

  @Post('/deleteVenue')
  deleteVenue(@Res() res: Response, @Body('id') id: string) {
    return this.venueService.deleteVenue(id).then((result) => {
      res.status(HttpStatus.OK).json({
        data: [],
        result: "ok",
        message: "SUCCESS"
      });
    })
  }
*/
}