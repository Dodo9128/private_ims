import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateNodeDto, UpdateNodeDto } from "../web/node/node.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Node } from '../entities/node.entity';
import { Row } from "exceljs";
import * as Constant from "../global/constant";

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
  async setNode(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    let node_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_ID) as number).toString();
    let parent_node_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_PARENT_NODE_ID) as number).toString();
    let node_id_temp = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_ID_TEMP) as number).toString();
    let parent_node_id_temp = rows.getCell(cellIndexMap.get(Constant.COL_KEY_PARENT_NODE_ID_TEMP) as number).toString();
    let name = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_NAME) as number).toString();
    let public_ip = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_PUBLIC_IP) as number).toString();
    let public_port = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_PUBLIC_PORT) as number) as number;
    let private_ip = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_PRIVATE_IP) as number).toString();
    let private_port = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_PRIVATE_PORT) as number) as number;
    let domain = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_DOMAIN) as number).toString();
    let region = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_REGION) as number).toString();
    let region_name = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_REGION_NAME) as number).toString();
    let instance_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_INSTANCE_ID) as number).toString();
    let node_type = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_NODE_TYPE) as number).toString();
    let is_origin = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_IS_ORIGIN) as number).toString();
    let initial_state = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_INITIAL_STATE) as number).toString();
    // let state = CommonCode.nodeStatus.ENABLE;
    // let is_auto_scale_out = CommonCode.IsYn.N;
    let ls_type = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_LS_TYPE) as number).toString();
    let ml_type = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_ML_TYPE) as number).toString();
    let deploy_type = rows.getCell(cellIndexMap.get(Constant.COL_KEY_NODE_DEPLOY_TYPE) as number).toString();

    const nid = await this.makeNodeId(systemId);

    let tmpData: object;

    if (newOne) { //신규
      tmpData = {
        id: nid,
        system_id: systemId,
        registered_at: new Date(Date.now()),
      }
    } else { //update
      tmpData = {
        system_id: systemId,
        updated_at: new Date(Date.now())
      }
    }

    Object.assign(tmpData, {
      name: name,
      system_id: systemId,
      public_ip,
      public_port,
      private_ip,
      private_port,
      domain,
      region,
      region_name,
      instance_id,
      node_type,
      is_origin,
      ls_type,
      ml_type,

    });
    console.log(tmpData)
    const result = (newOne) ? await this.save(tmpData) : await this.update({id: nid}, tmpData);
    //console.log(result);

    return result;
  }

  async getNodeList(query: string) {
    const result = await this.query(query);
    return result;
  }
}