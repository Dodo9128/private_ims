import {
  Controller,
  Post,
  Body,
  Query,
  Res, HttpStatus
} from '@nestjs/common';
import { Response} from 'express';
import { NodeService } from "../node/node.service";
import { JsonResult } from "../libs/utils/jsonResult";


@Controller('web/node')
export class WebNodeController {
  constructor(
    private nodeService: NodeService,
  ) {}

  @Post('/listNode4Mng')
  async listNode4Mng (
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

    const Result: Map<string, any> = await this.nodeService.listNode(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/listNode')
  listNode(
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

    //return this.nodeService.listNode();
  }

  @Post('/insertNode')
  async insertNode(
    @Body('name') name: string,
    @Body('system_id') system_id: string,
    @Body("public_ip") public_ip: string,
    @Body("public_port") public_port: number,
    @Body("private_ip") private_ip: string,
    @Body("private_port") private_port: number,
    @Body('node_type') node_type: string,
    @Body('is_origin') is_origin: string,
    @Body("domain") domain: string,
    @Body('region') region: string,
    @Body('region_name') region_name: string,
    @Body("instance_id") instance_id: string,
    @Body("initial_state") initial_state: string,
    @Body("state") state: string,
    @Body("is_auto_scale_out") is_auto_scale_out: string,
    @Body("ls_type") ls_type: string,
    @Body("ml_type") ml_type: string,
    @Body("deploy_type") deploy_type: string,
    @Body("parent_node_id") parent_node_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>;
    params
      .set("name", name)
      .set("system_id", system_id)
      .set("public_ip", public_ip)
      .set("public_port", public_port)
      .set("private_ip", private_ip)
      .set("private_port", private_port)
      .set("node_type", node_type)
      .set("is_origin", is_origin)
      .set("domain", domain)
      .set("region", region)
      .set("region_name", region_name)
      .set("instance_id", instance_id)
      .set("initial_state", initial_state)
      .set("state", state)
      .set("is_auto_scale_out", is_auto_scale_out)
      .set("ls_type", ls_type)
      .set("ml_type", ml_type)
      .set("deploy_type", deploy_type)
      .set("parent_node_id", parent_node_id);

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.insertNode4Web(params));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/updateNode')
  async updateNode(
    @Body('id') id: string,
    @Body('node_id') node_id: string,
    @Body('system_id') system_id: string,
    @Body('name') name: string,
    @Body("public_ip") public_ip: string,
    @Body("public_port") public_port: number,
    @Body("private_ip") private_ip: string,
    @Body("private_port") private_port: number,
    @Body('node_type') node_type: string,
    @Body('is_origin') is_origin: string,
    @Body("domain") domain: string,
    @Body('region') region: string,
    @Body('region_name') region_name: string,
    @Body("instance_id") instance_id: string,
    @Body("initial_state") initial_state: string,
    @Body("state") state: string,
    @Body("is_auto_scale_out") is_auto_scale_out: string,
    @Body("ls_type") ls_type: string,
    @Body("ml_type") ml_type: string,
    @Body("deploy_type") deploy_type: string,
    @Body("parent_node_id") parent_node_id: string,
    @Res() res: Response,
  ) {

    let params = new Map<string, any>;
    params
      .set("id", id)
      .set("node_id", node_id)
      .set("name", name)
      .set("system_id", system_id)
      .set("public_ip", public_ip)
      .set("public_port", public_port)
      .set("private_ip", private_ip)
      .set("private_port", private_port)
      .set("node_type", node_type)
      .set("is_origin", is_origin)
      .set("domain", domain)
      .set("region", region)
      .set("region_name", region_name)
      .set("instance_id", instance_id)
      .set("initial_state", initial_state)
      .set("state", state)
      .set("is_auto_scale_out", is_auto_scale_out)
      .set("ls_type", ls_type)
      .set("ml_type", ml_type)
      .set("deploy_type", deploy_type)
      .set("parent_node_id", parent_node_id);

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.updateNode4Web(params));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/deleteNode')
  async deleteNode(
    @Body('id') id: string,
    @Res() res: Response,
  ) {

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.deleteNode(id));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/getTemporaryInstanceInfo')
  async getTemporaryInstanceInfo(
    @Body('system_id') system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params.set("system_id", system_id);

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.getTemporaryInstanceInfo(params));

    res.status(HttpStatus.OK).json(Result);

  }

  @Post('/addTemporaryInstance')
  async addTemporaryInstance(
    @Query('system_id') system_id: string,
    @Query('region') region: string,
    @Query('instanceCount') instanceCount: number,
    @Query('instanceType') instanceType: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("region", region)
      .set("instanceCount", instanceCount)
      .set("instanceType", instanceType);

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.addTemporaryInstance(params));

    res.status(HttpStatus.OK).json(Result);
  }

  @Post('/listRegion4OnlyTemporaryInstance')
  async listRegion4OnlyTemporaryInstance(
    @Body('system_id') system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id);

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.listRegion4OnlyTemporaryInstance(params));

    res.status(HttpStatus.OK).json(Result);
  }

  @Post('/deleteTemporaryInstance')
  async deleteTemporaryInstance(
    @Body('system_id') system_id: string,
    @Body('region') region: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("system_id", system_id)
      .set("region", region);

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.deleteTemporaryInstance(params));

    res.status(HttpStatus.OK).json(Result);
  }

  @Post("/listNodeForInstanceMng")
  async listNodeForInstanceMng(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('sortColumn') sortColumn: string,
    @Query('isDescending') isDescending: string,
    @Query('system_id') system_id: string,
    @Res() res: Response,
  ) {
    let params = new Map<string, any>();
    params
      .set("pageNo", (pageNo) ? pageNo : 1)
      .set("pageSize", (pageSize) ? pageSize : 9999)
      .set("sortColumn", (sortColumn) ? sortColumn : "id")
      .set("isDescending", (isDescending) ? isDescending : "asc")
      .set("system_id", system_id);

    const Result: Map<string, any> = await this.nodeService.listNodeForInstanceMng(params);

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post('/startStopInstance')
  startStopInstance(
    @Body('system_id') system_id: string,
    @Body('action') action: string,
    @Body('nodeArr') nodeArr: string,
  ) {

    this.nodeService.startStopInstance(system_id, action, nodeArr);
  }
}
