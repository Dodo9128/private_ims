import {
  Controller,
  Get,
  Req,
  Res,
  Param,
  Post,
  Body,
  Query,
  ValidationPipe,
  HttpStatus,
  UseInterceptors, Bind, UploadedFiles
} from '@nestjs/common';
import { Response } from 'express';
import { VenueService } from "./venue.service";
import { CreateVenueDto, UpdateVenueDto } from "./venue.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {multerDiskDestinationOutOptions, multerMemoryOptions} from "../../libs/utils/multer.options";

@Controller('web/venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  /***** Venue 시작 *****/
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

  @Get('/listVenue')
  listVenue(@Res() res: Response) {
    return this.venueService.listVenue().then(rst => {
      res.status(HttpStatus.OK).json({
        data: rst,
        result: "ok",
        message: "SUCCESS"
      })
    });
  }
  @Get('/listVenue4Mng')
  listVenue4Mng(@Res() res: Response) {
    return this.venueService.listVenue().then(rst => {
      res.status(HttpStatus.OK).json({
        data: rst,
        result: "ok",
        message: "SUCCESS"
      })
    });
  }

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

  @Post('/insertVenue4Web')
  insertVenue4Web(@Res() res: Response, @Body() createVenueDto: CreateVenueDto) {
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

  @Post('/updateVenue4Web')
  updateVenue4Web(@Res() res: Response, @Body('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.updateVenue(id, updateVenueDto).then((rst) => {
      res.status(HttpStatus.OK).json({
        data: [],
        result: "ok",
        message: "SUCCESS"
      });
    })
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

  @Post('/uploadIMSExcel')
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOptions))
  @Bind(UploadedFiles())
  uploadFileMemory(
    files: File[],
    @Body('venue_id') venue_id: string,
    @Body('system_id') system_id: string,
    @Body('venue_delete') venue_delete: string,
    @Res() res: Response,
  ) {
    //const fileName = this.venueService.uploadFileMemory(venue_id, system_id, venue_delete, files)
    //console.log(fileName[0])

    res.status(HttpStatus.OK).json({
      data: this.venueService.uploadFileMemory(venue_id, system_id, venue_delete, files),
      result: "ok",
      message: "SUCCESS"
    })

  }
  /*
   **** Venue 끝 ****
   */
}