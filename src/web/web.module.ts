import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomTypeOrmModule } from "../database/typeorm.module"
import { WebController } from "./web.controller";
import { WebService } from "./web.service";
import { VenueController } from "./venue/venue.controller";
import { VenueService } from "./venue/venue.service";
import { SystemController } from "./system/system.controller";
import { SystemService } from "./system/system.service";
import { RuleController } from "./rule/rule.controller";
import { RuleService } from "./rule/rule.service";
import { ScaleController } from "./scale/scale.controller";
import { ScaleService } from "./scale/scale.service";
import { NodeController } from "./node/node.controller";
import { NodeService } from "./node/node.service";
import { GroupsController } from "./groups/groups.controller";
import { GroupsService } from "./groups/groups.service";
import { VideoController } from "./video/video.controller";
import { VideoService } from "./video/video.service";
import { AudioController } from "./audio/audio.controller";
import { AudioService } from "./audio/audio.service";
import { ChannelController } from "./channel/channel.controller";
import { ChannelService } from "./channel/channel.service";
import { EventController } from "./event/event.controller";
import { EventService } from "./event/event.service";
import { MonitController } from "./monit/monit.controller";
import { MonitService } from "./monit/monit.service";

/*entity 영역*/
import { Venue } from "../entities/venue.entity";
import { System } from "../entities/system.entity";
import { Rule } from "../entities/rule.entity";
import { Scale } from "../entities/scale.entity";
import { Node } from "../entities/node.entity";
import { Groups } from "../entities/group.entity";
import { Video } from "../entities/video.entity";
import { Audio } from "../entities/audio.entity";
import { Channel } from "../entities/channel.entity";
import { Event } from "../entities/event.entity";
import { Monit } from "../entities/monit.entity";

/*repository 영역*/
import { VenueRepository } from "../repository/venue.repository";
import { SystemRepository } from "../repository/system.repository";
import { RuleRepository } from "../repository/rule.repository";
import { ScaleRepository } from "../repository/scale.repository";
import { NodeRepository } from "../repository/node.repository";
import { GroupsRepository } from "../repository/groups.repository";
import { VideoRepository } from "../repository/video.repository";
import { AudioRepository } from "../repository/audio.repository";
import { ChannelRepository } from "../repository/channel.repository";
import { EventRepository } from "../repository/event.repository";
import { MonitRepository } from "../repository/monit.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Venue,
      System,
      Rule,
      Scale,
      Node,
      Groups,
      Video, Audio, Channel, Event, Monit
    ]),
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
      MonitRepository
    ]),
  ],
  controllers: [
    WebController,
    VenueController,
    SystemController,
    RuleController,
    ScaleController,
    NodeController,
    GroupsController,
    VideoController,
    AudioController,
    ChannelController,
    MonitController,
    EventController
  ],
  providers: [
    WebService,
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
  ],
})
export class WebModule {}