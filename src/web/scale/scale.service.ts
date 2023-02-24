import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScaleRepository } from "../../repository/scale.repository";
import { CreateScaleDto, UpdateScaleDto } from "./scale.dto";
import { Scale } from '../../entities/scale.entity';

import * as MybatisMapper from "mybatis-mapper";

MybatisMapper.createMapper(['./src/database/sqlmapper/Scale.xml']);

@Injectable()
export class ScaleService {
  constructor(
    private scaleRepository: ScaleRepository,
  ) {
  }
  async postScaleList(system_id: string): Promise<object> {
    const query = MybatisMapper.getStatement('Scale', 'listScale', { system_id }, {language: 'sql'})
    const data: any = await this.scaleRepository.findById(query);

    return {
      data: data
    }
  }
}
