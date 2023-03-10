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
  UseInterceptors, UploadedFiles,
  Bind
} from '@nestjs/common';
import { Response } from 'express';
import { ScaleService } from "../scale/scale.service";
import {JsonResult} from "../libs/utils/jsonResult";

@Controller('web/scale')
export class WebScaleController {
  constructor(
    private readonly scaleService: ScaleService
  ) {}

  @Post('/insertScale')
  async insertScale(
    @Body('system_id') system_id: number,
    @Body("scale_group_count") scale_group_count: number,
    @Body("scale_image_id") scale_image_id: string,
    @Body("scale_instance_type") scale_instance_type: string,
    @Body("scale_instance_type2") scale_instance_type2: string,
    @Body("scale_security_group_ids") scale_security_group_ids: string,
    @Body("scale_subnet_ids") scale_subnet_ids: string,
    @Body("scale_monitoring_tag_name") scale_monitoring_tag_name: string,
    @Body("scale_monitoring_tag_value") scale_monitoring_tag_value: string,
    @Body("scale_on") scale_on: string,
    @Body("scale_out_resource") scale_out_resource: number,
    @Body("scale_in_resource") scale_in_resource: number,
    @Body("scale_out_limit_time") scale_out_limit_time: number,
    @Body("scale_ss_name") scale_ss_name: string,
    @Body("scale_key_name") scale_key_name: string,
    @Body("region") region: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("scale_group_count", scale_group_count)
      .set("scale_image_id", scale_image_id)
      .set("scale_instance_type", scale_instance_type)
      .set("scale_instance_type2", scale_instance_type2)
      .set("scale_security_group_ids", scale_security_group_ids)
      .set("scale_subnet_ids", scale_subnet_ids)
      .set("scale_monitoring_tag_name", scale_monitoring_tag_name)
      .set("scale_monitoring_tag_value", scale_monitoring_tag_value)
      .set("scale_on", scale_on)
      .set("scale_out_resource", scale_out_resource)
      .set("scale_in_resource", scale_in_resource)
      .set("scale_out_limit_time", scale_out_limit_time)
      .set("scale_ss_name", scale_ss_name)
      .set("scale_key_name", scale_key_name)
      .set("region", region)

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.scaleService.insertScale(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/updateScale')
  async updateScale(
    @Body('scale_id') scale_id: string,
    @Body('system_id') system_id: string,
    @Body("scale_group_count") scale_group_count: number,
    @Body("scale_image_id") scale_image_id: string,
    @Body("scale_instance_type") scale_instance_type: string,
    @Body("scale_instance_type2") scale_instance_type2: string,
    @Body("scale_security_group_ids") scale_security_group_ids: string,
    @Body("scale_subnet_ids") scale_subnet_ids: string,
    @Body("scale_monitoring_tag_name") scale_monitoring_tag_name: string,
    @Body("scale_monitoring_tag_value") scale_monitoring_tag_value: string,
    @Body("scale_on") scale_on: string,
    @Body("scale_out_resource") scale_out_resource: number,
    @Body("scale_in_resource") scale_in_resource: number,
    @Body("scale_out_limit_time") scale_out_limit_time: number,
    @Body("scale_ss_name") scale_ss_name: string,
    @Body("scale_key_name") scale_key_name: string,
    @Body("region") region: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("scale_group_count", scale_group_count)
      .set("scale_image_id", scale_image_id)
      .set("scale_instance_type", scale_instance_type)
      .set("scale_instance_type2", scale_instance_type2)
      .set("scale_security_group_ids", scale_security_group_ids)
      .set("scale_subnet_ids", scale_subnet_ids)
      .set("scale_monitoring_tag_name", scale_monitoring_tag_name)
      .set("scale_monitoring_tag_value", scale_monitoring_tag_value)
      .set("scale_on", scale_on)
      .set("scale_out_resource", scale_out_resource)
      .set("scale_in_resource", scale_in_resource)
      .set("scale_out_limit_time", scale_out_limit_time)
      .set("scale_ss_name", scale_ss_name)
      .set("scale_key_name", scale_key_name)
      .set("region", region)

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.scaleService.updateScale(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listScale4Mng')
  async listScale4Mng(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('sortColumn') sortColumn: string,
    @Query('isDescending') isDescending: string,
    @Body("system_id") system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("pageNo", (pageNo) ? pageNo : 1)
      .set("pageSize", (pageSize) ? pageSize : 9999)
      .set("sortColumn", (sortColumn) ? sortColumn : "id")
      .set("isDescending", (isDescending) ? isDescending : "asc")
      .set("system_id", system_id);

    const Result: Map<string, any> = await this.scaleService.listScale4Mng(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listScale')
  async listScale(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('sortColumn') sortColumn: string,
    @Query('isDescending') isDescending: string,
    @Body("system_id") system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("pageNo", (pageNo) ? pageNo : 1)
      .set("pageSize", (pageSize) ? pageSize : 9999)
      .set("sortColumn", (sortColumn) ? sortColumn : "id")
      .set("isDescending", (isDescending) ? isDescending : "asc")
      .set("system_id", system_id);

    const Result: Map<string, any> = await this.scaleService.listScale(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/getScale')
  async getScale(
    @Body("system_id") system_id: string,
    @Body("id") scale_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("id", scale_id);

    const Result: Map<string, any> = await this.scaleService.getScale(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }
  @Post('/deleteScale')
  async deleteScale(
    @Body("system_id") system_id: string,
    @Body('id') scale_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("id", scale_id);

    const Result: Map<string, any> = JsonResult.makeSuccessBool(await this.scaleService.deleteScale(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }
}
