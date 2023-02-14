import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AppDataSource } from "../database/dataSource";
import { Venue } from "../entities/venue.entity";
import { System } from "../entities/system.entity";
import { Rule } from "../entities/rule.entity";
import { Scale } from "../entities/scale.entity";
import { Node } from "../entities/node.entity";
import { CodeCommon } from "../entities/codeCommon.entity";
import { WorldCountry } from "../entities/worldCountry.entity";
import { WorldState } from "../entities/worldState.entity";
import { WorldCity } from "../entities/worldCity.entity";
import { Channel } from "../entities/channel.entity";
import { Groups } from "../entities/group.entity";
import { Video } from "../entities/video.entity";
import { Audio } from "../entities/audio.entity";
import { AdaptiveStreaming } from "../entities/adaptiveStreaming.entity";

@Injectable()
export class ExcelRepository {
  constructor(private readonly dataSource: DataSource) {}
  async getExcelExportVenue(venueId: string) {
    return await this.dataSource
      .getRepository(Venue)
      .createQueryBuilder()
      .select(
        "id, IF(country_id = 0, null, country_id) as country_id, IF(state_id = 0, null, state_id) as state_id, IF(city_id = 0, null, city_id) as city_id, event_name, SUBSTRING_INDEX(event_code, '-', 1) as event_yymm, name, description, timezone_name, timezone_offset, comment",
      )
      .where("id = :venue_id", { venue_id: venueId })
      .getRawOne();
  }

  async getWorldCountryName(countryId: number) {
    return await this.dataSource
      .getRepository(WorldCountry)
      .createQueryBuilder()
      .select("name")
      .where("id = :country_id", { country_id: countryId })
      .getRawOne();
  }

  async getWorldStateName(stateId: number) {
    return await this.dataSource
      .getRepository(WorldState)
      .createQueryBuilder()
      .select("name")
      .where("id = :state_id", { state_id: stateId })
      .getRawOne();
  }
  async getWorldCityName(cityId: number) {
    return await this.dataSource
      .getRepository(WorldCity)
      .createQueryBuilder()
      .select("name")
      .where("id = :city_id", { city_id: cityId })
      .getRawOne();
  }

  async getExcelExportSystem(systemId: string) {
    return await this.dataSource
      .getRepository(System)
      .createQueryBuilder()
      .select("name, description, fps, width, height, is_extra")
      .where("id = :system_id", { system_id: systemId })

      .getRawOne();
  }

  async getExcelExportRule(systemId: string) {
    return await this.dataSource
      .getRepository(Rule)
      .createQueryBuilder()
      .select("name, description, node_type, session, max_instances, region")
      .where("system_id = :system_id", { system_id: systemId })

      .getRawOne();
  }

  async getExcelExportScale(systemId: string) {
    return await this.dataSource
      .getRepository(Scale)
      .createQueryBuilder()
      .select(
        "scale_group_count, scale_image_id, scale_instance_type, scale_instance_type2, scale_security_group_ids, scale_subnet_ids, scale_monitoring_tag_name, scale_monitoring_tag_value, scale_on, scale_out_resource, scale_in_resource, scale_out_limit_time, scale_ss_name, scale_key_name, region",
      )
      .where("system_id = :system_id", { system_id: systemId })

      .getRawOne();
  }

  async getExcelExportNode(systemId: string) {
    return await this.dataSource
      .getRepository(Node)
      .createQueryBuilder()
      .select(
        "id as node_id, parent_node_id, name, node_type, public_ip, public_port, private_ip, private_port, domain, region, is_origin, ls_type, ml_type, deploy_type, instance_id, initial_state",
      )
      .where("system_id = :system_id", { system_id: systemId })
      .getRawMany();
  }

  async getFncCodeDesc(code: string) {
    return await this.dataSource.getRepository(CodeCommon).query(`SELECT FNC_CODEDESC('${code}')`);
  }

  async getFncCodeName(elem: string) {
    return await this.dataSource.getRepository(CodeCommon).query(`SELECT FNC_CODENAME('${elem}')`);
  }

  async getExcelExportNodeForCameraGroup(systemId: string) {
    return await this.dataSource
      .getRepository(Node)
      .createQueryBuilder()
      .select(`public_ip, domain, node_type`)
      .where(`node_type IN (:...node_type)`, { node_type: ["CM0407", "CM0410"] })
      .andWhere(`system_id = :system_id`, { system_id: systemId })
      .getRawMany();
  }

  async getExcelExportChannel(systemId: string) {
    return await this.dataSource
      .getRepository(Channel)
      .createQueryBuilder()
      .select(
        `live_index as channel_index, camera_ip, name, status, media_type, gimbal_ip, is_gimbal_reset as gimbal_preset, server_ip, server_port, pdview_master_index`,
      )
      .where(`system_id = :system_id`, { system_id: systemId })
      .getRawMany();
  }

  async getExcelExportGroup(systemId: string) {
    return await this.dataSource
      .getRepository(Groups)
      .createQueryBuilder("groups")
      .select(
        `group_index as group_id, name, view_type, description, type, is_external_group as external_group, default_channel_index as default_video_channel_index, default_audio_index as default_audio_channel_index, is_default_group as default_group, is_interactive as interactive, is_replay as replay, is_timemachine as timemachine, is_pdview as pdview`,
      )
      .where(`system_id = :system_id`, { system_id: systemId })
      .getRawMany();
  }

  async getExcelExportVideo(systemId: string) {
    return await this.dataSource
      .getRepository(Video)
      .createQueryBuilder()
      .select(`group_id, codec, width, height, bitrate, gop, fps, is_input`)
      .where(`group_id LIKE :system_id`, { system_id: `%${systemId}%` })
      .getRawMany();
  }

  async getExcelExportAudio(systemId: string) {
    return await this.dataSource
      .getRepository(Audio)
      .createQueryBuilder()
      .select(`group_id, channel_type, codec, sample_rate, sample_bit, is_input`)
      .where(`group_id LIKE :system_id`, { system_id: `%${systemId}%` })
      .getRawMany();
  }

  async getExcelExportAdaptiveStreaming(systemId: string) {
    return await this.dataSource
      .getRepository(AdaptiveStreaming)
      .createQueryBuilder()
      .select(`group_id, is_input, codec, width, height, bitrate, gop, fps`)
      .where(`group_id LIKE :system_id`, { system_id: `%${systemId}%` })
      .getRawMany();
  }
}
