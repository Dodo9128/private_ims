import { Controller, Get, Param, Post, Query, Ip, Req, Res, HttpStatus, Body, Put, Delete } from '@nestjs/common';
import { NodeService } from "../node/node.service";
import { JsonResult } from "../libs/utils/jsonResult";
import { Response, Request } from 'express';
import * as CommonCode from "../global/commonCode";

@Controller('node')
export class NodeController {
  constructor(
    private nodeService: NodeService,
  ) { }

  @Post("/startStopInstance")
  startStopInstance(
    @Param("system_id") system_id: string,
    @Param("action") action: string,
    @Param("nodeArr") nodeArr: string,
  ) {
    this.nodeService.startStopInstance(system_id, action, nodeArr);
  }

  @Post("/listNodeForInstanceMng")
  listNodeForInstanceMng(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('sortColumn') sortColumn: string,
    @Query('isDescending') isDescending: string,
    @Query('system_id') system_id: string,
  ) {
    let params = new Map<string, any>();
    params
      .set("pageNo", (pageNo) ? pageNo : 1)
      .set("pageSize", (pageSize) ? pageSize : 9999)
      .set("sortColumn", (sortColumn) ? sortColumn : "id")
      .set("isDescending", (isDescending) ? isDescending : "asc")
      .set("system_id", system_id);
    this.nodeService.listNodeForInstanceMng(params);
  }

  @Get("/:system_id/nodeIp44DLS")
  async nodeIp44DLS(
    @Param("system_id") system_id: string,
    @Ip() srcServerIp,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.nodeIp44DLS(srcServerIp, system_id));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/:system_id/scaleOut4DSS")
  async scaleOut4DSS(
    @Param("system_id") systemId: string,
    @Body("instance_id") instanceId: string,
    @Body("private_ip") privateIp: string,
    @Body("private_port") privatePort: number,
    @Body("initial_state") initialState: string,
    @Body("region") region: string,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.scaleOut4DSS(systemId, instanceId, privateIp, privatePort, initialState, region));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Put("/:system_id/scaleOut4DSSOk/:node_id")
  async scaleOut4DSSOk(
    @Param("system_id") systemId: string,
    @Param("node_id") nodeId: string,
    @Body("public_ip") publicIp: string,
    @Body("public_port") publicPort: string,
    @Body("domain") domain: string,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessBool(await this.nodeService.scaleOut4DSSOk(systemId, nodeId, publicIp, publicPort, domain));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Put("/:system_id/test_call4DRSAfterScaleOut/:node_id")
  async test_call4DRSAfterScaleOut(
    @Param("system_id") systemId: string,
    @Param("node_id") nodeId: string,
    @Body("server_ip") serverIp: string,
    @Body("server_port") serverPort: number,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessBool(await this.nodeService.call4DRSAfterScaleOutOrIn(systemId, nodeId, CommonCode.APIMethod.PUT));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/:system_id/scaleIn4DSS/:node_id")
  async scaleIn4DSS(
    @Param("system_id") systemId: string,
    @Param("node_id") nodeId: string,
    @Res() res: Response,
  ) {
    const Result = JsonResult.makeSuccessBool(await this.nodeService.scaleIn4DSS(systemId, nodeId));
    res.status(HttpStatus.OK).json(Result);
  }

  @Delete("/test_call4DRSAfterScaleIn/:node_id")
  public async test_call4DRSAfterScaleIn(
    @Body("system_id") systemId: string,
    @Param("node_id") nodeId: string,
    @Body("server_ip") serverIp: string,
    @Body("server_port") serverPort: number,
    @Res() res: Response,
  ) {
    const Result = JsonResult.makeSuccessBool(await this.nodeService.call4DRSAfterScaleOutOrIn(systemId, nodeId, CommonCode.APIMethod.DELETE));
    res.status(HttpStatus.OK).json(Result);
  }

  @Put("/test_call4DLSAfter4DSSInsert/:node_id")
  public async test_call4DLSAfter4DSSInsert(
    @Param("node_id") nodeId: string,
    @Res() res: Response,
  ) {
    const Result = JsonResult.makeSuccessBool(await this.nodeService.call4DLSAfter4DSSUpsertDelete(nodeId, true, false));
    res.status(HttpStatus.OK).json(Result);
  }

  @Put("/test_call4DLSAfter4DSSUpdate/:node_id")
  public async test_call4DLSAfter4DSSUpdate(
    @Param("node_id") nodeId: string,
    @Res() res: Response,
  ) {
    const Result = JsonResult.makeSuccessBool(await this.nodeService.call4DLSAfter4DSSUpsertDelete(nodeId, false, false));
    res.status(HttpStatus.OK).json(Result);
  }

  @Delete("/test_call4DLSAfter4DSSDelete/:node_id")
  public async test_call4DLSAfter4DSSDelete(
    @Param("node_id") nodeId: string,
    @Res() res: Response,
  ) {
    const Result = JsonResult.makeSuccessBool(await this.nodeService.call4DLSAfter4DSSUpsertDelete(nodeId, false, true));
    res.status(HttpStatus.OK).json(Result);
  }
  @Put("/test_call4DLSAfter4DSSStateUpdate2Disable/:node_id")
  public async test_call4DLSAfter4DSSStateUpdate2Disable(
    @Param("node_id") nodeId: string,
    @Res() res: Response,
  ) {
    const Result = JsonResult.makeSuccessBool(await this.nodeService.call4DLSAfter4DSSStateUpdate(nodeId, CommonCode.nodeStatus.DISABLE));
    res.status(HttpStatus.OK).json(Result);
  }

  @Put("/test_call4DLSAfter4DSSStateUpdate2Enable/:node_id")
  public async test_call4DLSAfter4DSSStateUpdate2Enable(
    @Param("node_id") nodeId: string,
    @Res() res: Response,
  ) {
    const Result = JsonResult.makeSuccessBool(await this.nodeService.call4DLSAfter4DSSStateUpdate(nodeId, CommonCode.nodeStatus.ENABLE));
    res.status(HttpStatus.OK).json(Result);
  }

  @Get("/:system_id/nodeIp44DML")
  public async nodeIp44DML(
    @Param("system_id") systemId: string,
    @Ip() srcServerIp,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.nodeIp44DML(srcServerIp, systemId));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/:system_id/scaleOut4DML")
  public async scaleOut4DML(
    @Param("system_id") systemId: string,
    @Body("instance_id") instanceId: string,
    @Body("private_ip") privateIp: string,
    @Body("private_port") privatePort: number,
    @Body("initial_state") initialState: string,
    @Body("region") region: string,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.scaleOut4DML(systemId, instanceId, privateIp, privatePort, initialState, region));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Put("/:system_id/scaleOut4DMLOk/:node_id/:rs_id")
  public async scaleOut4DMLOk(
    @Param("system_id") systemId: string,
    @Param("node_id") nodeId: string,
    @Param("rs_id") rsId: string,
    @Body("public_ip") publicIp: string,
    @Body("public_port") publicPort: string,
    @Body("domain") domain: string,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessBool(await this.nodeService.scaleOut4DMLOk(systemId, nodeId, rsId, publicIp, publicPort, domain));
    res.status(HttpStatus.OK).json(Result);
  }

  @Post("/:system_id/scaleIn4DML/:node_id/:rs_id")
  public async scaleIn4DML(
    @Param("system_id") systemId: string,
    @Param("node_id") nodeId: string,
    @Param("rs_id") rsId: string,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessBool(await this.nodeService.scaleIn4DML(systemId, nodeId, rsId));
    res.status(HttpStatus.OK).json(Result);
  }

  @Post("/insertNode")
  public async insertNode(
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

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.insertNode(params));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/updateNode")
  public async updateNode(
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
    let params = new Map<string, any>();
    params
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

    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.updateNode(params));

    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/listNode4Mng")
  public async listNode4Mng(
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

    const Result: Map<string, any> = JsonResult.makeSuccessPaging(await this.nodeService.listNode(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/listNode")
  public async listNode(
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
    const Result: Map<string, any> = JsonResult.makeSuccessArray(await this.nodeService.listNode4Cms(params));

    return res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }

  @Post("/getNode")
  public async getNode(
    @Body("id") id: string,
    @Res() res: Response,
  ) {
    const Result: Map<string, any> = JsonResult.makeSuccessVo(await this.nodeService.getNode(new Map(Object.entries( {id}))));
    res.status(HttpStatus.OK).json(Object.fromEntries(Result));
  }
}