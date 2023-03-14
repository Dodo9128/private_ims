import * as Constant from "../global/constant";
import { InjectRepository } from "@nestjs/typeorm";
import { Row, Workbook } from "exceljs";
import { DataSource } from "typeorm";

import { VenueRepository } from "../venue/venue.repository";
import { SystemRepository } from "../system/system.repository";
import { RuleRepository } from "../rule/rule.repository";
import { ScaleRepository } from "../scale/scale.repository";
import { NodeRepository } from "../node/node.repository";
import { WorldCountry } from "../entities/worldCountry.entity";

import { VenueMapper } from "../venue/venue.mapper";
import { SystemMapper } from "../system/system.mapper";

import { Venue } from "../entities/venue.entity";
import { System } from "../entities/system.entity";
import { Groups } from "../entities/group.entity";
import { Node } from "../entities/node.entity";
import { Scale } from "../entities/scale.entity";
import { Rule } from "../entities/rule.entity";
import { Video } from "../entities/video.entity";
import { Audio } from "../entities/audio.entity";
import { Channel } from "../entities/channel.entity";

import { NodeService } from "../node/node.service";
import { RuleService } from "../rule/rule.service";
import { ScaleService } from "../scale/scale.service";
import { GroupsService } from "../groups/groups.service";
import { VideoService } from "../video/video.service";
import { AudioService } from "../audio/audio.service";
import { ChannelService } from "../channel/channel.service";

import { nodeStatus, IsYN } from "../global/commonCode";

export class AdminService {
  constructor(
    @InjectRepository(VenueRepository) private venueRepository: VenueRepository,
    @InjectRepository(SystemRepository) private systemRepository: SystemRepository,
    @InjectRepository(RuleRepository) private ruleRepository: RuleRepository,
    @InjectRepository(ScaleRepository) private scaleRepository: ScaleRepository,
    @InjectRepository(NodeRepository) private nodeRepository: NodeRepository,
    private dataSource: DataSource,
    private venueMapper: VenueMapper,
    private systemMapper: SystemMapper,
    private nodeService: NodeService,
    private ruleService: RuleService,
    private scaleService: ScaleService,
    private groupsService: GroupsService,
    private videoService: VideoService,
    private audioService: AudioService,
    private channelService: ChannelService,
  ) {}

  private m_venue_id: string = null;
  private m_system_id: string = null;
  private m_group_id: string = null;
  private nodeIdMap = new Map<string, string>();
  private m_cellIndexMap = new Map<string, number>();
  private async _deleteSubInfo(venueId: string, venueDelete: boolean, systemId: string): Promise<void> {
    if (venueDelete) {
      const systemList: Map<string, any> = await this.systemRepository.findByVenueId(venueId);
      if (systemList && systemList.size > 0) {
        systemList.forEach((item) => {
          if (item.id === systemId) {
            this.ruleRepository.delete({system_id: item.id});
            this.scaleRepository.delete({system_id: item.id});
            this.nodeRepository.delete({system_id: item.id});
            this.systemRepository.delete({id: item.id});
          }
        })
      }
      await this.venueRepository.delete({id: venueId});
    }
  }

  public async deleteIMSExcel(venueId: string, venueDelete: boolean, systemId: string): Promise<boolean> {
    this.m_group_id = null;
    this.m_venue_id = null;
    this.m_system_id = null;

    if (venueId) {
      this._deleteSubInfo(venueId, venueDelete, systemId);
      this.m_venue_id = venueId;
      this.m_system_id = systemId;
    }

    return true;
  }

  public async uploadIMSExcel(excelFile: string, venueId: string, systemId: string) {

    this.m_venue_id = null;
    this.m_system_id = null;
    this.m_group_id = null;

    if(venueId) {
      this.m_venue_id = venueId;
    }

    if (systemId) {
      this.m_system_id = systemId;
    }

    const wb = new Workbook();
    let cellIndexMap = new Map<string, number>();

    wb.xlsx.readFile(excelFile).then(async () => {
      const sheet = wb.worksheets[0];

      for (let i = 1; i < sheet.rowCount + 1; i+=1) {
        let rows = sheet.getRow(i);
        if (rows === null ) { continue; }
        if (i === 2) {
          let cellIndex = 1;
          rows.eachCell({ includeEmpty: true }, c => {
            let cellKey = c.value?.toString();
            if (cellKey !== null) {
              this.m_cellIndexMap.set(cellKey, cellIndex);
            }
            cellIndex += 1;
          })
        } else if (i === 3) { continue; }

        let type = rows.getCell(Constant.COLINDEX_TYPE + 1).toString();
        let temp = rows.getCell(Constant.COLINDEX_IS_EXECUTE + 1).toString();
        let isExecute: string = "O";

        if (temp === isExecute) {
          switch (type) {
            case Constant.TYPE_VENUE:
              await this.setVenue(rows);
              break;
            case Constant.TYPE_SYSTEM:
              await this.setSystem(rows);
              break;
            case Constant.TYPE_RULE:
              await this.setRule(rows);
              break;
            case Constant.TYPE_SCALE:
              await this.setScale(rows);
              break;
            case Constant.TYPE_NODE:
              await this.setNode(rows);
              break;
            case Constant.TYPE_GROUP:
              await this.setGroup(rows);
              break;
            case Constant.TYPE_VIDEO:
              await this.setVideo(rows);
              break;
            case Constant.TYPE_AUDIO:
              await this.setAudio(rows);
              break;
            case Constant.TYPE_CHANNEL:
              await this.setChannel(rows);
              break;
          }
        }
      }
    })

    return this.m_venue_id;
  }

  private getCellIndex(colKey: string) {
    return this.m_cellIndexMap.get(colKey);
  }
  async setVenue(rows: Row) {
    let venue: Venue = null;
    let tmpData = new Map<string, any>();

    let venue_id        = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_ID) as number).toString()
    let country_id      = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_COUNTRY_ID) as number).toString();
    let state_id        = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_STATE_ID) as number).toString() || 0;
    let city_id         = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_CITY_ID) as number).toString() || 0;
    let event_name      = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_EVENT_NAME) as number).toString();
    let event_yymm      = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_EVENT_YYMM) as number).toString();
    let name            = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_NAME) as number).toString();
    let description     = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_DESCRIPTION) as number).toString();
    let timezone_name   = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_TIMEZONE_NAME) as number).toString();
    let timezone_offset = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VENUE_TIMEZONE_OFFSET) as number).toString();

    tmpData
      .set("venue_id", venue_id)
      .set("country_id", country_id)
      .set("state_id", state_id)
      .set("city_id", city_id)
      .set("event_name", event_name)
      .set("event_yymm", event_yymm)
      .set("name", name)
      .set("description", description)
      .set("timezone_name", timezone_name)
      .set("timezone_offset", timezone_offset)

    if (this.m_venue_id === null) {
      if (!venue_id) {
        venue = await this.venueMapper.insertVenue(tmpData);
      } else {
        venue = await this.venueMapper.updateVenue(venue_id, tmpData);
      }
    } else {
      venue = await this.venueMapper.insertVenue(tmpData)
    }

    this.m_venue_id = venue.id

    return venue;
  }

  async setSystem(rows: Row) {
    let system: System = null;
    let tmpData = new Map<string, any>();

    let system_id = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SYSTEM_ID) as number).toString();
    let name = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SYSTEM_NAME) as number).toString();
    let description = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SYSTEM_DESCRIPTION) as number).toString();
    let fps:number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SYSTEM_FPS) as number);
    let width:number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SYSTEM_WIDTH) as number);
    let height:number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SYSTEM_HEIGHT) as number);
    let comment = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SYSTEM_COMMENT) as number).toString();
    let is_extra = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SYSTEM_IS_EXTRA) as number).toString();

    tmpData
      .set("system_id", system_id)
      .set("name", name)
      .set("description", description)
      .set("fps", fps)
      .set("width", width)
      .set("height", height)
      .set("comment", comment)
      .set("is_extra", is_extra)

    if (this.m_system_id === null) {
      if (system_id === null) {
        console.log("this.m_venue_id", this.m_venue_id)
        system = await this.systemMapper.insertSystem(this.m_system_id, this.m_venue_id, tmpData);
      } else {
        system = await this.systemMapper.updateSystem(system_id, this.m_venue_id, tmpData);
      }
      system = await this.systemMapper.insertSystem(this.m_system_id, this.m_venue_id, tmpData);
    }
    this.m_system_id = system.id;

    return system;
  }

  async setNode(rows: Row) {
    let node: Node = null;
    let parentNodeId: string = null;
    let tmpData = new Map<string, any>();

    let node_id               = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_ID) as number).toString();
    let parent_node_id        = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_PARENT_NODE_ID) as number).toString();
    let node_id_temp          = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_ID_TEMP) as number).toString();
    let parent_node_id_temp   = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_PARENT_NODE_ID_TEMP) as number).toString();
    let name                  = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_NAME) as number).toString();
    let public_ip             = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_PUBLIC_IP) as number).toString();
    let public_port: number   = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_PUBLIC_PORT) as number);
    let private_ip            = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_PRIVATE_IP) as number).toString();
    let private_port: number  = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_PRIVATE_PORT) as number);
    let domain                = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_DOMAIN) as number).toString();
    let region                = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_REGION) as number).toString();
    let region_name           = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_REGION_NAME) as number).toString();
    let instance_id           = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_INSTANCE_ID) as number).toString();
    let node_type             = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_NODE_TYPE) as number).toString();
    let is_origin             = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_IS_ORIGIN) as number).toString();
    let initial_state         = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_INITIAL_STATE) as number).toString();
    let state                 = nodeStatus.ENABLE;
    let is_auto_scale_out     = IsYN.N;
    let ls_type               = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_LS_TYPE) as number).toString();
    let ml_type               = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_ML_TYPE) as number).toString();
    let deploy_type           = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_NODE_DEPLOY_TYPE) as number).toString();

    tmpData
      .set("node_id", node_id)
      .set("system_id", this.m_system_id)
      .set("parent_node_id", parent_node_id)
      .set("node_id_temp", node_id_temp)
      .set("name", name)
      .set("public_ip", public_ip)
      .set("public_port", public_port)
      .set("private_ip", private_ip)
      .set("private_port", private_port)
      .set("domain", domain)
      .set("region", region)
      .set("region_name", region_name)
      .set("instance_id", instance_id)
      .set("node_type", node_type)
      .set("is_origin", is_origin)
      .set("initial_state", initial_state)
      .set("state", state)
      .set("is_auto_scale_out", is_auto_scale_out)
      .set("ls_type", ls_type)
      .set("ml_type", ml_type)
      .set("deploy_type", deploy_type);

    if (parent_node_id_temp === null) {
      if (is_origin === IsYN.N && (this.nodeIdMap.has(parent_node_id_temp))) {
        parentNodeId = this.nodeIdMap.get(parent_node_id_temp);
        tmpData.set("parent_node_id_temp", parent_node_id_temp);
      }
    }

    if (node_id === null || node_id === '') {
      tmpData.set("isCcall4DLSPut", false);
      node = await this.nodeService.insertNode(tmpData);
    } else {
      node = await this.nodeService.updateNode(tmpData);
    }

    if (IsYN.Y === is_origin) {
      this.nodeIdMap
        .set("node_id_temp", node.id);
    }

    return node;
  }

  async setGroup(rows: Row) {
    let group: Groups = null;
    let tmpData = new Map<string, any>();

    let group_id					            = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_ID) as number).toString();
    let groupIndex					          = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_INDEX) as number).toString();
    let name						              = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_NAME) as number).toString();
    let view_type				              = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_VIEW_TYPE) as number).toString();
    let description				            = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_DESCRIPTION) as number).toString();
    let type						              = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_TYPE) as number).toString();
    let is_external_group		          = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_IS_EXTERNAL_GROUP) as number).toString();
    let is_replay				              = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_IS_REPLAY) as number).toString();
    let is_pdview				              = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_IS_PDVIEW) as number).toString();
    let is_interactive			          = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_IS_INTERACTIVE) as number).toString();
    let is_timemachine			          = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_IS_TIMEMACHINE) as number).toString();
    let default_channel_index: number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_DEFAULT_CHANNEL_INDEX) as number);
    let default_audio_index: number   = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_DEFAULT_AUDIO_INDEX) as number);
    let is_default_group			        = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_GROUP_IS_DEFAULT_GROUP) as number).toString();

    tmpData
      .set("group_id", group_id)
      .set("system_id", this.m_system_id)
      .set("groupIndex", groupIndex)
      .set("name", name)
      .set("view_type", view_type)
      .set("description", description)
      .set("type", type)
      .set("is_external_group", is_external_group)
      .set("is_replay", is_replay)
      .set("is_pdview", is_pdview)
      .set("is_interactive", is_interactive)
      .set("is_timemachine", is_timemachine)
      .set("default_channel_index", default_channel_index)
      .set("default_audio_index", default_audio_index)
      .set("is_default_group", is_default_group)

    if (group_id === null || group_id === '') {
      //group = await this.groupsService.insertGroup(tmpData);
    } else {
      //group = await this.groupsService.updateGroup(tmpData);
    }

    this.m_group_id = group.id;

    return group;
  }

  async setScale(rows: Row) {
    let scale: Scale = null;
    let tmpData = new Map<string, any>();

    let scale_id = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_ID) as number).toString();
    let scaleImageId = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_IMAGE_ID) as number).toString();
    let scaleInstanceType = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_INSTANCE_TYPE) as number).toString();
    let scaleInstanceType2 = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_INSTANCE_TYPE2) as number).toString();
    let scaleSecurityGroupIds = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_SECURITY_GROUP_IDS) as number).toString();
    let scaleSubnetIds = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_SUBNET_IDS) as number).toString();
    let scaleMonitoringTagName = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_MONITORING_TAG_NAME) as number).toString();
    let scaleMonitoringTagValue = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_MONITORING_TAG_VALUE) as number).toString();
    let scaleOn = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_ON) as number).toString();
    let scaleOutResource = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_SCALE_OUT_RESOURCE) as number).toString();
    let scaleIntResource = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_INT_RESOURCE) as number).toString();
    let scaleOutLimitTime = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_OUT_LIMIT_TIME) as number).toString();
    let scaleSsName = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_SS_NAME) as number).toString();
    let scaleKeyName = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_KEY_NAME) as number).toString();
    let region = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_SCALE_REIGON) as number).toString();

    tmpData
      .set("scale_id", scale_id)
      .set("system_id", this.m_system_id)
      .set("scaleImageId", scaleImageId)
      .set("scaleInstanceType", scaleInstanceType)
      .set("scaleInstanceType2", scaleInstanceType2)
      .set("scaleSecurityGroupIds", scaleSecurityGroupIds)
      .set("scaleSubnetIds", scaleSubnetIds)
      .set("scaleMonitoringTagName", scaleMonitoringTagName)
      .set("scaleMonitoringTagValue", scaleMonitoringTagValue)
      .set("scaleOn", scaleOn)
      .set("scaleOutResource", scaleOutResource)
      .set("scaleIntResource", scaleIntResource)
      .set("scaleOutLimitTime", scaleOutLimitTime)
      .set("scaleSsName", scaleSsName)
      .set("scaleKeyName", scaleKeyName)
      .set("region", region)

    if (scale_id === null || scale_id === '') {
      scale = await this.scaleService.insertScale(tmpData);
    } else {
      scale = await this.scaleService.updateScale(tmpData);
    }

    return scale;
  }

  async setRule(rows: Row) {
    let rule: Rule = null;
    let tmpData = new Map<string,any>();

    let rule_id       = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_RULE_ID) as number).toString();
    let name          = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_RULE_NAME) as number).toString();
    let description   = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_RULE_DESCRIPTION) as number).toString();
    let node_type     = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_RULE_NODE_TYPE) as number).toString();
    let session:      number  = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_RULE_SESSION) as number);
    let maxInstances: number  = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_RULE_MAX_INSTANCES) as number);
    let region:       string  = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_RULE_REIGON) as number).toString();

    tmpData
      .set("rule_id", rule_id)
      .set("system_id", this.m_system_id)
      .set("name", name)
      .set("description", description)
      .set("node_type", node_type)
      .set("session", session)
      .set("maxInstances", maxInstances)
      .set("region", region)

    if (rule_id === null || rule_id === '') {
     rule = await this.ruleService.insertRule(tmpData);
    } else {
     rule = await this.ruleService.updateRule(tmpData);
    }

    return rule;
  }

  async setVideo(rows: Row) {
    let video: Video = null;
    let tmpData = new Map<string, any>();

    let video_id  = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VIDEO_ID) as number).toString();
    let codec			= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VIDEO_CODEC) as number).toString();
    let width			: number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VIDEO_WIDTH) as number);
    let height		: number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VIDEO_HEIGHT) as number);
    let bitrate		: number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VIDEO_BITRATE) as number);
    let gop				: number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VIDEO_GOP) as number);
    let fps				= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VIDEO_FPS) as number).toString();
    let isInput		= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_VIDEO_IS_INPUT) as number).toString();

    tmpData
      .set("video_id", video_id)
      .set("group_id", this.m_group_id)
      .set("codec", codec)
      .set("width", width)
      .set("height", height)
      .set("bitrate", bitrate)
      .set("gop", gop)
      .set("fps", fps)
      .set("isInput", isInput);

    if (video_id === null || video_id === '') {
      video = await this.videoService.insertVideo(tmpData);
    } else {
      video = await this.videoService.updateVideo(tmpData);
    }

    return video;
  }

  async setAudio(rows: Row) {
    let audio: Audio = null;
    let tmpData = new Map<string, any>();

    let audio_id		= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_AUDIO_ID) as number).toString();
    let codec				= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_AUDIO_CODEC) as number).toString();
    let channelType = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_AUDIO_CHANNEL_TYPE) as number).toString();
    let sampleRate	= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_AUDIO_SAMPLE_RATE) as number).toString();
    let sampleBit		= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_AUDIO_SAMPLE_BIT) as number).toString();
    let isInput			= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_AUDIO_IS_INPUT) as number).toString();

    tmpData
      .set("audio_id", audio_id)
      .set("group_id", this.m_group_id)
      .set("codec", codec)
      .set("channelType", channelType)
      .set("sampleRate", sampleRate)
      .set("sampleBit", sampleBit)
      .set("isInput", isInput);

    if (audio_id === null || audio_id === '') {
      audio = await this.audioService.insertAudio(tmpData);
    } else {
      audio = await this.audioService.updateAudio(tmpData);
    }

    return audio;
  }

  async setChannel(rows: Row) {
    let channel: Channel = null;
    let tmpData = new Map<string, any>();

    let channel_id				  = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_ID) as number).toString();
    let name						    = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_NAME) as number).toString();
    let description				  = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_DESCRIPTION) as number).toString();
    let live_index					: number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_LIVE_INDEX) as number);
    let pdview_master_index	: number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_PDVIEW_MASTER_INDEX) as number);
    let gimbal_ip				    = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_GIMBAL_IP) as number).toString();
    let is_gimbal_reset			= rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_IS_GIMBAL_RESET) as number).toString();
    let camera_ip				    = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_CAMERA_IP) as number).toString();
    let server_ip				    = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_SERVER_IP) as number).toString();
    let server_port					: number = +rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_SERVER_PORT) as number);
    let status					    = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_STATUS) as number).toString();
    let media_type				  = rows.getCell(this.m_cellIndexMap.get(Constant.COL_KEY_CHANNEL_MEDIA_TYPE) as number).toString();

    tmpData
      .set("channel_id", channel_id)
      .set("system_id", this.m_system_id)
      .set("name", name)
      .set("description", description)
      .set("live_index", live_index)
      .set("pdview_master_index", pdview_master_index)
      .set("gimbal_ip", gimbal_ip)
      .set("is_gimbal_reset", is_gimbal_reset)
      .set("camera_ip", camera_ip)
      .set("server_ip", server_ip)
      .set("server_port", server_port)
      .set("status", status)
      .set("media_type", media_type);

    if (channel_id === null || channel_id === '') {
      channel = await this.channelService.insertChannel(tmpData);
    } else {
      channel = await this.channelService.updateChannel(tmpData);
    }

    return channel;
  }

  async upLoadIMSGroupChannelExcel(excelFile: string, systemId: string) {
    try {
      let m_system_id = systemId
    } catch(err) {

    }
  }

  async loadAdaptiveStreaming(excelFile: string, systemId: string | null) {
    const wb = new Workbook();
    let adaptiveStreamingList = [];
    let preAdaptiveStreamingNo: number = 1;

    wb.xlsx.readFile(excelFile).then(() => {
      let sheet = wb.worksheets[0];
      for (let  i = 11; i < sheet.rowCount + 1; i+=1) {
        let rows = sheet.getRow(i);

        if (null === rows) { continue; }

        // TODO:...
      }
    })
  }
}