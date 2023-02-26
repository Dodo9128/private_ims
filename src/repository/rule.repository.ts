import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateRuleDto, UpdateRuleDto } from "../web/rule/rule.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Rule } from '../entities/rule.entity';
import { Row } from "exceljs";
import * as Constant from "../global/constant";

@CustomRepository(Rule)
export class RuleRepository extends Repository<Rule> {
  async makeRuleId(systemId: string) {
    let tmpId;
    const tmpIds = await this.query(`SELECT CAST( IFNULL( MAX( RIGHT( id, 3 ) ), '000' ) AS UNSIGNED INTEGER ) + 1 as ruleId FROM rule WHERE id LIKE '${systemId}%'`);
    switch(tmpIds[0].ruleId.length) {
      case 1:
        tmpId = `${systemId}00${tmpIds[0].ruleId}`;
        break;
      case 2:
        tmpId = `${systemId}0${tmpIds[0].ruleId}`;
        break;
      case 3:
        tmpId = `${systemId}${tmpIds[0].ruleId}`;
        break;
    }
    return tmpId;
  }
  async setRule(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    let rule_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_RULE_ID) as number).toString();
    let name = rows.getCell(cellIndexMap.get(Constant.COL_KEY_RULE_NAME) as number).toString();
    let description = rows.getCell(cellIndexMap.get(Constant.COL_KEY_RULE_DESCRIPTION) as number).toString();
    let node_type = rows.getCell(cellIndexMap.get(Constant.COL_KEY_RULE_NODE_TYPE) as number).toString();
    let session = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_RULE_SESSION) as number) as number;
    let maxInstance = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_RULE_MAX_INSTANCES) as number) as number;
    let region = rows.getCell(cellIndexMap.get(Constant.COL_KEY_RULE_REIGON) as number).toString();

    const rid = await this.makeRuleId(systemId);

    let tmpData: object;

    if (newOne) { //신규
      tmpData = {
        id: rid,
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
      name,
      description,
      node_type,
      session,
      max_instance: maxInstance,
      region
    });

    const result = (newOne) ? await this.save(tmpData) : await this.update({id: rid}, tmpData);

    return result;
  }

  async findById(query: string) {
    const result = await this.query(query);
    return result;
  }
}