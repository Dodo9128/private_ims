import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { WebNodeController } from '../web/web.node.controller';
import { NodeMapper } from "./node.mapper";
import { NodeRepository } from "./node.repository";

@Module({
  providers: [NodeService, NodeRepository, NodeMapper],
  controllers: [WebNodeController]
})
export class NodeModule {}
