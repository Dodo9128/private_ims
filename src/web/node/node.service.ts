import { Injectable } from "@nestjs/common";
import { NodeRepository } from "../../repository/node.repository";
import { CreateNodeDto, UpdateNodeDto } from "./node.dto";
import { Node } from '../../entities/node.entity';

import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/Node.xml']);

@Injectable()
export class NodeService {
  constructor(
    private readonly nodeRepository: NodeRepository,
  ) {
  }
  async postNodeList(system_id: string): Promise<object> {
    let param = {
      system_id: system_id
    };

    const query = MybatisMapper.getStatement('Node', 'listNode', {system_id}, {language: 'sql'})
    const data: any = await this.nodeRepository.getNodeList(query);

    return {
      data
    };
  }
}
