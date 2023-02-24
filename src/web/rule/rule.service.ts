import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RuleRepository } from "../../repository/rule.repository";
import { CreateRuleDto, UpdateRuleDto } from "./rule.dto";
import { Rule } from '../../entities/rule.entity';

import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/Rule.xml']);

@Injectable()
export class RuleService {
  constructor(
    private ruleRepository: RuleRepository,
  ) {
  }
  async postRuleList(system_id: string): Promise<object> {
    const query = MybatisMapper.getStatement('Rule', 'listRule', {system_id}, {language: 'sql'})
    console.log(query);
    const data: any = await this.ruleRepository.findById(query);

    return {
      data
    };
  }
}
