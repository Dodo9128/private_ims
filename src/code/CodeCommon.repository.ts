import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { CodeCommon } from '../entities/codeCommon.entity';

import {Row} from "exceljs";



export class CodeCommonRepository extends Repository<CodeCommon> {
  async findByCode(code: string) {
    return this.findByCode(code);
  }
}