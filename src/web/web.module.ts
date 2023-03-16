import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from "../database/typeorm.module"

import { WebVenueController } from "./web.venue.controller";
import { WebSystemController } from "./web.system.controller";
import { WebRuleController } from "./web.rule.controller";
import { WebScaleController } from "./web.scale.controller";
import { WebNodeController } from "./web.node.controller";
import { WebGroupsController } from "./web.groups.controller";
import { WebVideoController } from "./web.video.controller";
import { WebAudioController } from "./web.audio.controller";
import { WebChannelController } from "./web.channel.controller";
import { WebEventController } from "./web.event.controller";
import { WebMonitController } from "./web.monit.controller";

import { AdminService } from "../admin/admin.service";
import { VenueService } from "../venue/venue.service";
import { SystemService } from "../system/system.service";
import { RuleService } from "../rule/rule.service";
import { ScaleService } from "../scale/scale.service";
import { NodeService } from "../node/node.service";
import { GroupsService } from "../groups/groups.service";
import { VideoService } from "../video/video.service";
import { AudioService } from "../audio/audio.service";
import { ChannelService } from "../channel/channel.service";
import { EventService } from "../event/event.service";
import { MonitService } from "../monit/monit.service";

/*repository 영역*/
import { VenueRepository } from "../venue/venue.repository";
import { SystemRepository } from "../system/system.repository";
import { RuleRepository } from "../rule/rule.repository";
import { ScaleRepository } from "../scale/scale.repository";
import { NodeRepository } from "../node/node.repository";
import { GroupsRepository } from "../groups/groups.repository";
import { VideoRepository } from "../video/video.repository";
import { AudioRepository } from "../audio/audio.repository";
import { ChannelRepository } from "../channel/channel.repository";
import { EventRepository } from "../event/event.repository";
import { MonitRepository } from "../monit/monit.repository";
import { CodeCommonRepository } from "../code/CodeCommon.repository";
import { WorldCountryRepository } from "../world/world.repository";

import { VenueMapper } from "../venue/venue.mapper";
import { SystemMapper } from "../system/system.mapper";
import { NodeMapper } from "../node/node.mapper";
import { ScaleMapper } from "../scale/scale.mapper";
import { GroupsMapper } from "../groups/groups.mapper";
import { RuleMapper } from "../rule/rule.mapper";
import { MonitMapper } from "../monit/monit.mapper";
import { ChannelMapper } from "../channel/channel.mapper";
import { EventMapper } from "../event/event.mapper";
import { HttpModule } from "@nestjs/axios";


@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([
      VenueRepository,
      SystemRepository,
      RuleRepository,
      ScaleRepository,
      NodeRepository,
      GroupsRepository,
      VideoRepository,
      AudioRepository,
      ChannelRepository,
      EventRepository,
      MonitRepository,
      CodeCommonRepository,
      WorldCountryRepository
    ]),
    HttpModule,
  ],
  controllers: [
    WebVenueController,
    WebSystemController,
    WebRuleController,
    WebScaleController,
    WebNodeController,
    WebGroupsController,
    WebVideoController,
    WebAudioController,
    WebChannelController,
    WebMonitController,
    WebEventController,
  ],
  providers: [
    AdminService,
    VenueService,
    SystemService,
    RuleService,
    ScaleService,
    NodeService,
    GroupsService,
    VideoService,
    AudioService,
    ChannelService,
    EventService,
    MonitService,
    VenueMapper,
    SystemMapper,
    NodeMapper,
    ScaleMapper,
    GroupsMapper,
    RuleMapper,
    MonitMapper,
    ChannelMapper,
    EventMapper,
  ],
  exports: [
    AdminService,
    VenueService,
    SystemService,
    RuleService,
    ScaleService,
    NodeService,
    GroupsService,
    VideoService,
    AudioService,
    ChannelService,
    EventService,
    MonitService,
    VenueMapper,
    SystemMapper,
    NodeMapper,
    ScaleMapper,
    GroupsMapper,
    RuleMapper,
    MonitMapper,
    ChannelMapper,
  ]
})
export class WebModule {}