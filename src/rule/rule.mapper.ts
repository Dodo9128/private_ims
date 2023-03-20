import { InjectRepository } from "@nestjs/typeorm";
import { RuleRepository } from "./rule.repository";
import { Rule } from "../entities/rule.entity";
import { PageUtil } from "../util/page.util";

import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/Rule.xml'])
const myBatisFormat: object = { language: 'sql' };

export class RuleMapper {
  constructor(
    @InjectRepository(RuleRepository)
    private ruleRepository: RuleRepository,
  ) {}

  public async listRule(params: Map<string, any>): Promise<Map<string, any>> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const totalCount: number = await this.listRuleCount(params);
    const query = MybatisMapper.getStatement("Rule", "listRule", Object.fromEntries(params), myBatisFormat);

    return PageUtil.setPageDataMap(await this.ruleRepository.query(query), totalCount);
  }

  private async listRuleCount(params: Map<string, any>): Promise<number> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const query = MybatisMapper.getStatement("Rule", 'listRuleCount', Object.fromEntries(params), myBatisFormat);
    const Result = await this.ruleRepository.query(query);

    return Result[0].cnt;
  }

  public async getRule(params: Map<string, any>): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement("Rule", 'getRule', Object.fromEntries(params), myBatisFormat);
    console.log(query)
    return await this.ruleRepository.query(query);
  }

  public async getMaxRuleId(params: Map<string, any>): Promise<number>{
    const query = MybatisMapper.getStatement("Rule", "getMaxRuleId", Object.fromEntries(params), myBatisFormat);
    return await this.ruleRepository.query(query);
  }

  public async getRuleForNodeType(params: Map<string, any>): Promise<Map<string, any>> {
    const query = MybatisMapper.getStatement("Rule", "getRuleForNodeType", Object.fromEntries(params), myBatisFormat);
    return await this.ruleRepository.query(query);
  }
}