import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { NodeMapper } from "./node.mapper";
import { NodeRepository } from "./node.repository";
import { CodeCommonRepository } from "../code/CodeCommon.repository";
import { SystemRepository } from "../system/system.repository";
import { ScaleMapper } from "../scale/scale.mapper"
import { HttpModule } from "@nestjs/axios";
import { VenueRepository } from "../venue/venue.repository";
import { WorldCountryRepository } from "../world/world.repository";
import { ChannelRepository } from "../channel/channel.repository";
import { ChannelMapper } from "../channel/channel.mapper";
import { EventMapper } from "../event/event.mapper";
import { ScaleRepository } from "../scale/scale.repository";
import { EventRepository } from "../event/event.repository";


@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    NodeService,
    NodeRepository,
    NodeMapper,
    CodeCommonRepository,
    SystemRepository,
    ScaleMapper,
    VenueRepository,
    WorldCountryRepository,
    ChannelMapper,
    ChannelRepository,
    EventMapper,
    ScaleRepository,
    EventRepository,
  ],
  controllers: [NodeController]
})
export class NodeModule {}
