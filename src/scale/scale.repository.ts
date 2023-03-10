import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CreateScaleDto, UpdateScaleDto } from "./scale.dto";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Scale } from '../entities/scale.entity';
import { Row } from "exceljs";
import * as Constant from "../global/constant";

@CustomRepository(Scale)
export class ScaleRepository extends Repository<Scale> {
  async makeScaleId(systemId: string) {
    let tmpId;
    const tmpIds = await this.query(`SELECT CAST( IFNULL( MAX( RIGHT( id, 3 ) ), '000' ) AS UNSIGNED INTEGER ) + 1 as scaleId FROM scale WHERE id LIKE '${systemId}%'`)
    switch(tmpIds[0].scaleId.length) {
      case 1:
        tmpId = `${systemId}00${tmpIds[0].scaleId}`;
        break;
      case 2:
        tmpId = `${systemId}0${tmpIds[0].scaleId}`;
        break;
      case 3:
        tmpId = `${systemId}${tmpIds[0].scaleId}`;
        break;
    }
    return tmpId;
  }

  async findById(query: string) {
    const result = await this.query(query);
    return result;
  }

  async setScale(rows: Row, cellIndexMap: Map<string, number>, venueId: string, systemId: string, newOne: boolean) {
    let scale_id = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_ID) as number).toString();
    let scaleGroupCount = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_GROUP_COUNT) as number) as number;
    let scaleImageId = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_IMAGE_ID) as number).toString();
    let scaleInstanceType = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_INSTANCE_TYPE) as number).toString();
    let scaleInstanceType2 = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_INSTANCE_TYPE2) as number).toString();
    let scaleSecurityGroupIds = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_SECURITY_GROUP_IDS) as number).toString();
    let scaleSubnetIds = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_SUBNET_IDS) as number).toString();
    let scaleMonitoringTagName = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_MONITORING_TAG_NAME) as number).toString();
    let scaleMonitoringTagValue = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_MONITORING_TAG_VALUE) as number).toString();
    let scaleOn = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_ON) as number).toString();
    let scaleOutResource = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_SCALE_OUT_RESOURCE) as number) as number;
    let scaleInResource = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_INT_RESOURCE) as number) as number;
    let scaleOutLimitTIme = +rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_OUT_LIMIT_TIME) as number) as number;
    let scaleSsName = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_SS_NAME) as number).toString();
    let scaleKeyName = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_SCALE_KEY_NAME) as number).toString();
    let region = rows.getCell(cellIndexMap.get(Constant.COL_KEY_SCALE_REIGON) as number).toString();

    const sid = await this.makeScaleId(systemId);

    let tmpData: object;

    if (newOne) { //신규
      tmpData = {
        id: sid,
        system_id: systemId,
        registered_at: new Date(Date.now()),
      }
    } else { //update
      tmpData = {
        system_id: systemId,
        updated_at: new Date(Date.now())
      }
    }

    Object.assign(tmpData, {
      scale_group_count: scaleGroupCount,
      scale_image_id: scaleImageId,
      scale_instance_type: scaleInstanceType,
      scale_instance_type2: scaleInstanceType2,
      scale_security_group_ids: scaleSecurityGroupIds,
      scale_subnet_ids: scaleSubnetIds,
      scale_monitoring_tag_name: scaleMonitoringTagName,
      scale_monitoring_tag_value: scaleMonitoringTagValue,
      scale_on: scaleOn,
      scale_out_resource: scaleOutResource,
      scale_in_resource: scaleInResource,
      scale_out_limit_time: scaleOutLimitTIme,
      scale_ss_name: scaleSsName,
      scale_key_name: scaleKeyName,
      region
    })

    const result = (newOne) ? await this.save(tmpData) : await this.update({id: sid}, tmpData);

    return result;
  }
}