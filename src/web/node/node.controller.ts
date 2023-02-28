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
import { NodeService } from "./node.service";
import { CreateNodeDto, UpdateNodeDto } from "./node.dto";

@Controller('web/node')
export class NodeController {
  constructor(
    private readonly nodeService: NodeService,

  ) {}

  @Post('/listNode4Mng')
  postNodeList (@Body("system_id") system_id: string) {
    return this.nodeService.postNodeList(system_id);
  }

  @Post('/insertNode')
  insertNode(
    @Body() createNodeDto: CreateNodeDto,
    /*@Body('system_id') system_id: string,
    @Body('name') name: string,
    @Body('node_type') node_type: string,
    @Body('is_origin') is_origin: string,
    @Body('region') region: string,
    @Body("public_ip") public_ip: string,
    @Body("public_port") public_port: number,
    @Body("private_ip") private_ip: string,
    @Body("private_port") private_port: number,
    @Body("instance_id") instance_id: string,
    @Body("initial_state") initial_state: string,
    @Body("state") state: string,
    @Body("ls_type") ls_type: string,
    @Body("ml_type") ml_type: string,
    @Body("deploy_type") deploy_type: string,
    @Body("domain") domain: string,*/
  ) {
    // return this.nodeService.insertNode(system_id, name, node_type, is_origin, region, public_ip, public_port, private_port, private_port, instance_id, initial_state, state, ls_type, ml_type, deploy_type, domain);
    // return this.nodeService.insertNode(createNodeDto);
  }

  @Post('/updateNode')
  updateNode(
    @Body() updateNodeDto: UpdateNodeDto,
    /*@Body('id') id: string,
    @Body('name') name: string,
    @Body('node_type') node_type: string,
    @Body('is_origin') is_origin: string,
    @Body('region') region: string,
    @Body("public_ip") public_ip: string,
    @Body("public_port") public_port: number,
    @Body("private_ip") private_ip: string,
    @Body("private_port") private_port: number,
    @Body("instance_id") instance_id: string,
    @Body("initial_state") initial_state: string,
    @Body("state") state: string,
    @Body("ls_type") ls_type: string,
    @Body("ml_type") ml_type: string,
    @Body("deploy_type") deploy_type: string,
    @Body("domain") domain: string,*/
  ) {
    // return this.nodeService.updateNode(id, name, node_type, is_origin, region, public_ip, public_port, private_port, private_port, instance_id, initial_state, state, ls_type, ml_type, deploy_type, domain);
    // return this.nodeService.updateNode(updateNodeDto);
  }

  @Post('/deleteNode')
  deleteNode(
    @Body('id') id: string,
  ) {
    //return this.nodeService.deleteNode(id);
  }

  @Post('/getTemporaryInstanceInfo')
  getTemporaryInstanceInfo(
    @Body('system_id') system_id: string
  ) {
    // return this.nodeService.getTemporaryInstanceInfo(system_id)
  }

  @Post('/addTemporaryInstance')
  addTemporaryInstance(
    @Body('system_id') system_id: string,
    @Body('region') region: string,
    @Body('instanceCount') instanceCount: number,
    @Body('instaceType') instancetype: string,
  ) {
    // return this.nodeService.addTemporaryInstance(system_id, region, instanceCount, instanceType);
  }

  @Post('/listRegion4OnlyTemporaryInstance')
  listRegion4OnlyTemporaryInstance(
    @Body('system_id') system_id: string,
  ) {
    // return this.nodeService.listRegion4OnlyTemporaryInstance(system_id);
  }

  @Post('/deleteTemporaryInstance')
  deleteTemporaryInstance(
    @Body('system_id') system_id: string,
    @Body('region') region: string,
  ) {
    // return this.nodeService.deleteTemporaryInstance(system_id, region);
  }

  @Post('/listNodeForInstanceMng')
  listNodeForInstanceMng(

    @Query('system_id') system_id: string,
  ) {

  }

  @Post('/startStopInstance')
  startStopInstance(
    @Body('system_id') system_id: string,
    @Body('action') action: string,
    @Body('nodeArr') nodeArr: object,
  ) {

  }
}
