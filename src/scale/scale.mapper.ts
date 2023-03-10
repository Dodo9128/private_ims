import { InjectRepository } from "@nestjs/typeorm";
import { ScaleRepository } from "./scale.repository";
import { Scale } from "../entities/scale.entity";
import * as MybatisMapper from "mybatis-mapper";
import { PageUtil } from "../util/page.util";

MybatisMapper.createMapper(['./src/database/sqlmapper/Scale.xml'])

const myBatisFormat: object = { language: 'sql' };

export class ScaleMapper {
  constructor(
    @InjectRepository(ScaleRepository)
    private scaleRepository: ScaleRepository,
  ) {
  }
  public async getScaleInstanceType(params: Map<string, any>): Promise<Map<string, any>> {
    let retMap = new Map<string, any>();
    const query = MybatisMapper.getStatement('Scale', 'getScaleInstanceType', Object.fromEntries(params), myBatisFormat);

    retMap.set("data", await this.scaleRepository.query(query));

    return retMap;
  }

  public async listScale(params: Map<string, any>) {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const totalCount: number = await this.listScaleCount(params);
    const query = MybatisMapper.getStatement("Scale", "listScale", Object.fromEntries(params), myBatisFormat);

    return PageUtil.setPageDataMap(await this.scaleRepository.query(query), totalCount);
  }

  private async listScaleCount(params: Map<string, any>): Promise<number> {
    (isNaN(params.get('pageNo'))) ? params.set('pageNo', 1) : 1;
    (isNaN(params.get('pageSize'))) ? params.set('pageSize', 9999) : 1;
    (undefined === params.get('sortColumn')) ? params.set('sortColumn', 'id') : 1;
    (undefined === params.get('isDescending')) ? params.set('isDescending', 'asc') : 1;

    const query = MybatisMapper.getStatement("Scale", 'listScaleCount', Object.fromEntries(params), myBatisFormat);
    const Result = await this.scaleRepository.query(query);

    return Result[0].cnt;
  }

  public async getScale(params: Map<string, any>) {
    const query = MybatisMapper.getStatement("Scale", 'getScale', Object.fromEntries(params), myBatisFormat);

    return await this.scaleRepository.query(query);
  }
}