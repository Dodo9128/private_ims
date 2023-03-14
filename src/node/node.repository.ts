import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Node } from '../entities/node.entity';

@CustomRepository(Node)
export class NodeRepository extends Repository<Node> {

  async makeNodeId(systemId: string) {
    let tmpId;
    const tmpIds = await this.query(`SELECT CAST( IFNULL( MAX( RIGHT( id, 3 ) ), '000' ) AS UNSIGNED INTEGER ) + 1 as nodeId FROM node WHERE id LIKE '${systemId}%'`);
    switch(tmpIds[0].nodeId.length) {
      case 1:
        tmpId = `${systemId}00${tmpIds[0].nodeId}`;
        break;
      case 2:
        tmpId = `${systemId}0${tmpIds[0].nodeId}`;
        break;
      case 3:
        tmpId = `${systemId}${tmpIds[0].nodeId}`;
        break;
    }
    return tmpId;
  }

  async findById(id: string) {
    return await this.findById(id);
  }
}