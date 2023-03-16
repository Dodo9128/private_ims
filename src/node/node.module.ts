import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { NodeMapper } from "./node.mapper";

import { HttpModule } from "@nestjs/axios";
import { CustomTypeOrmModule } from "../database/typeorm.module";

import { NodeRepository } from "./node.repository";
import { VenueRepository } from "../venue/venue.repository";
import { SystemRepository } from "../system/system.repository";
import { WorldCountryRepository } from "../world/world.repository";
import { ChannelRepository } from "../channel/channel.repository";
import { ScaleRepository } from "../scale/scale.repository";
import { EventRepository } from "../event/event.repository";
import { CodeCommonRepository } from "../code/CodeCommon.repository";


import { ScaleMapper } from "../scale/scale.mapper"
import { ChannelMapper } from "../channel/channel.mapper";
import { EventMapper } from "../event/event.mapper";

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([
      NodeRepository,
    ]),
    HttpModule,
  ],
  providers: [
    NodeService, NodeRepository, NodeMapper,
    CodeCommonRepository, SystemRepository, VenueRepository, WorldCountryRepository, ChannelRepository, ScaleRepository, EventRepository,
    ChannelMapper, ScaleMapper, EventMapper,
  ],
  controllers: [NodeController]
})
export class NodeModule {}
