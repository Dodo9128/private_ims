import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScaleRepository } from "./scale.repository";
import { ScaleMapper } from "./scale.mapper";
import { Scale } from '../entities/scale.entity';
import {makeSuccessPaging} from "../util/ajaxreturn.util";

@Injectable()
export class ScaleService {
  constructor(
    @InjectRepository(ScaleRepository)
    private scaleRepository: ScaleRepository,
    private scaleMapper: ScaleMapper,
  ) {
  }
  async insertScale(params: Map<string, any>): Promise<Scale> {
    let scale: Scale = new Scale();
    let items: Scale;
    let scaleId: string = await this.scaleRepository.makeScaleId(params.get("system_id"));

    scale.id = scaleId;
    scale.system_id = params.get("systemId");
    scale.scale_group_count = params.get("scaleGroupCount");
    scale.scale_image_id = params.get("scaleImageId");
    scale.scale_instance_type = params.get("scaleInstanceType");
    scale.scale_instance_type2 = params.get("scaleInstanceType2");
    scale.scale_security_group_ids = params.get("scaleSecurityGroupIds");
    scale.scale_subnet_ids = params.get("scaleSubnetIds");
    scale.scale_monitoring_tag_name = params.get("scaleMonitoringTagName");
    scale.scale_monitoring_tag_value = params.get("scaleMonitoringTagValue");
    scale.scale_on = params.get("scaleOn");
    scale.scale_out_resource = params.get("scaleOutResource");
    scale.scale_in_resource = params.get("scaleInResource");
    scale.scale_out_limit_time = params.get("scaleOutLimitTime");
    scale.scale_ss_name = params.get("scaleSsName");
    scale.scale_key_name = params.get("scaleKeyName");
    scale.region = params.get("region");

    items = await this.scaleRepository.save(scale);

    return items;
  }

  async updateScale(params: Map<string, any>): Promise<Scale> {
    let scale: Scale = new Scale();
    let items: Scale;

    scale.id = params.get("scale_id");
    scale.system_id = params.get("systemId");
    scale.scale_group_count = params.get("scaleGroupCount");
    scale.scale_image_id = params.get("scaleImageId");
    scale.scale_instance_type = params.get("scaleInstanceType");
    scale.scale_instance_type2 = params.get("scaleInstanceType2");
    scale.scale_security_group_ids = params.get("scaleSecurityGroupIds");
    scale.scale_subnet_ids = params.get("scaleSubnetIds");
    scale.scale_monitoring_tag_name = params.get("scaleMonitoringTagName");
    scale.scale_monitoring_tag_value = params.get("scaleMonitoringTagValue");
    scale.scale_on = params.get("scaleOn");
    scale.scale_out_resource = params.get("scaleOutResource");
    scale.scale_in_resource = params.get("scaleInResource");
    scale.scale_out_limit_time = params.get("scaleOutLimitTime");
    scale.scale_ss_name = params.get("scaleSsName");
    scale.scale_key_name = params.get("scaleKeyName");
    scale.region = params.get("region");


    items = await this.scaleRepository.save(scale);

    return items;
  }

  async listScale(params: Map<string, any>) {
    return makeSuccessPaging(await this.scaleMapper.listScale(params));
  }

  async listScale4Mng(params: Map<string, any>) {
    return makeSuccessPaging(await this.scaleMapper.listScale(params));
  }

  async getScale(params: Map<string, any>) {
    return await this.scaleMapper.getScale(params);
  }

  async deleteScale(params: Map<string, any>) {
    await this.scaleRepository.delete({ id: params.get("scale_id")});
    return true;
  }
}
