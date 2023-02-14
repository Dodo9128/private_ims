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

    // return await this.dataSource
    //   .getRepository(Venue)
    //   .createQueryBuilder("V")
    //   .select(
    //     `V.id as id, WC.name as country_id, WS.name as state_id, WCITY.name as city_id, V.event_name as event_name, SUBSTRING_INDEX(V.event_code, '-', 1) as event_yymm, V.name as name, V.description as description, V.timezone_name as timezone_name, V.timezone_offset as timezone_offset, V.comment as comment from venue as V left join world_country as WC on V.country_id = WC.id left join world_state as WS on V.state_id = WS.id left join world_city as WCITY on V.city_id = WCITY.id`,
    //   )
    //   .where("id = :venue_id", { venue_id: venueId })
    //   .getRawOne();

    // return await this.dataSource
    //   .getRepository(Venue)
    //   .createQueryBuilder("V")
    //   .select("V.id", "id")
    //   .leftJoinAndSelect("V.country_id", "country_id")
    //   .leftJoinAndSelect("V.state_id", "state_id")
    //   .leftJoinAndSelect("V.city_id", "city_id")
    //   .select("V.event_name", "event_name")
    //   .select("SUBSTRING_INDEX(V.event_code, '-', 1)", "eveny_yymm")
    //   .select("V.name", "name")
    //   .select("V.description", "description")
    //   .select("V.timezone_name", "timezone_name")
    //   .select("V.timezone_offset", "timezone_offset")
    //   .select("V.comment", "comment")
    //   .where("id = :venue_id", { venue_id: venueId })
    //   .getRawOne();

    // return await this.dataSource
    //   .getRepository(Venue)
    //   .query(
    //     `V.id as id, WC.name as country_id, WS.name as state_id, WCITY.name as city_id, V.event_name as event_name, SUBSTRING_INDEX(V.event_code, '-', 1) as event_yymm, V.name as name, V.description as description, V.timezone_name as timezone_name, V.timezone_offset as timezone_offset, V.comment as comment from venue as V left join world_country as WC on V.country_id = WC.id left join world_state as WS on V.state_id = WS.id left join world_city as WCITY on V.city_id = WCITY.id where V.id = '${venueId}'`,
    //   );
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
}
