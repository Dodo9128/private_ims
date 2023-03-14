import { Controller, Get, Param, Post, Query, Ip } from '@nestjs/common';
import { NodeService } from "../node/node.service";
import { NodeRepository } from "./node.repository";


@Controller('node')
export class NodeController {
  constructor(
    private nodeService: NodeService,
    private nodeMapper: NodeService,
    private nodeRepository: NodeRepository
  ) {
  }

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

  @Get("/:system_id/nodeIp44DML")
  nodeIp44DML(
    @Param("system_id") systemId: string,
    @Ip() srcServerIp,
  ) {
    console.log(systemId)
    this.nodeService.nodeIp44DML(srcServerIp, systemId)
  }
}