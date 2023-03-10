import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { WebRuleController } from '../web/web.rule.controller';

@Module({
  providers: [RuleService],
  controllers: [WebRuleController]
})
export class RuleModule {}
