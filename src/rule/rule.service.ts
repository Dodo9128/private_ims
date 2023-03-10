import { Injectable } from "@nestjs/common";
import { Rule } from '../entities/rule.entity';
import { RuleMapper } from "./rule.mapper";
import { RuleRepository } from "./rule.repository";

import {JsonResult} from "../libs/utils/jsonResult";
import {makeSuccessPaging} from "../util/ajaxreturn.util";

@Injectable()
export class RuleService {
  constructor(
    private ruleRepository: RuleRepository,
    private ruleMapper: RuleMapper,
  ) {
  }

  async insertRule(params: Map<string, any>): Promise<Rule> {
    let rule: Rule = new Rule();
    let items: Rule;
    let ruleId: string = await this.ruleRepository.makeRuleId(params.get("system_id"));

    rule.id = ruleId;
    rule.system_id      = params.get("system_id");
    rule.name           = params.get("name");
    rule.description    = params.get("description");
    rule.node_type      = params.get("node_type");
    rule.session        = params.get("session");
    rule.max_instances  = params.get("maxInstances");
    rule.region         = params.get("region");
    rule.registered_at  = new Date(Date.now());

    items = await this.ruleRepository.save(rule);

    return items;
  }

  async updateRule(params: Map<string, any>): Promise<Rule> {
    let rule: Rule = new Rule();
    let items: Rule;

    rule.id             = params.get("ruleId");
    rule.system_id      = params.get("system_id");
    rule.name           = params.get("name");
    rule.description    = params.get("description");
    rule.node_type      = params.get("node_type");
    rule.session        = params.get("session");
    rule.max_instances  = params.get("maxInstances");
    rule.region         = params.get("region");
    rule.updated_at     = new Date(Date.now());

    items = await this.ruleRepository.save(rule);

    return items;
  }

  async insertRule4Web(params: Map<string, any>): Promise<Rule> {
    let rule: Rule = new Rule();
    let items: Rule;
    let ruleId: string = await this.ruleRepository.makeRuleId(params.get("system_id"));

    rule.id = ruleId;
    rule.system_id      = params.get("system_id");
    rule.name           = params.get("name");
    rule.description    = params.get("description");
    rule.node_type      = params.get("node_type");
    rule.session        = params.get("session");
    rule.max_instances  = params.get("maxInstances");
    rule.region         = params.get("region");
    rule.registered_at  = new Date(Date.now());

    items = await this.ruleRepository.save(rule);

    return items;
  }

  async updateRule4Web(params: Map<string, any>): Promise<Rule> {
    let rule: Rule = new Rule();
    let items: Rule;

    rule.id             = params.get("ruleId");
    rule.system_id      = params.get("system_id");
    rule.name           = params.get("name");
    rule.description    = params.get("description");
    rule.node_type      = params.get("node_type");
    rule.session        = params.get("session");
    rule.max_instances  = params.get("maxInstances");
    rule.region         = params.get("region");
    rule.updated_at     = new Date(Date.now());

    items = await this.ruleRepository.save(rule);

    return items;
  }

  async deleteRule(params: Map<string,any>) {
    await this.ruleRepository.delete({ id: params.get("rule_id")});

    return true;
  }

  async getRule(params: Map<string, any>) {
    return await this.ruleMapper.getRule(params);
  }

  async listRule(params: Map<string, any>) {
    return makeSuccessPaging(await this.ruleMapper.listRule(params));
  }

  async listRule4Mng(params: Map<string, any>) {
    return makeSuccessPaging(await this.ruleMapper.listRule(params));
  }
}
