import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from "../database/typeorm.module";

import { RuleController } from "./rule.controller";

import { RuleService } from './rule.service';

import { RuleRepository } from "./rule.repository";

import { RuleMapper } from "./rule.mapper";



@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([
      RuleRepository,
    ]),
  ],
  controllers: [RuleController],
  providers: [
    RuleService, RuleMapper,
  ]
})
export class RuleModule {}
