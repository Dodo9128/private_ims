import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from "../database/typeorm.module"

import { NodeController } from './node.controller';

import { NodeService } from './node.service';

import { NodeRepository } from "./node.repository";
import { VenueRepository } from "../venue/venue.repository";
import { SystemRepository } from "../system/system.repository";
import { WorldCountryRepository } from "../world/world.repository";
import { ChannelRepository } from "../channel/channel.repository";
import { ScaleRepository } from "../scale/scale.repository";
import { EventRepository } from "../event/event.repository";
import { CodeCommonRepository } from "../code/CodeCommon.repository";

import { NodeMapper } from "./node.mapper";
import { ScaleMapper } from "../scale/scale.mapper"
import { ChannelMapper } from "../channel/channel.mapper";
import { EventMapper } from "../event/event.mapper";

import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([
      NodeRepository,
      VenueRepository,
      SystemRepository,
      WorldCountryRepository,
      ChannelRepository,
      ScaleRepository,
      EventRepository,
      CodeCommonRepository,
    ]),
    HttpModule,
  ],
  controllers: [NodeController],
  providers: [
    NodeService, NodeMapper, ChannelMapper, ScaleMapper, EventMapper,
  ]
})
export class NodeModule {}
