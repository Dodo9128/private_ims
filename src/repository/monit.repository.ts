import { HttpStatus, HttpException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { CustomRepository } from "../api/decorator/typeorm.decorator";
import { Repository } from "typeorm";
import { Monit } from '../entities/monit.entity';

@CustomRepository(Monit)
export class MonitRepository extends Repository<Monit> {
 async lstSvc4Monit(query) {
  const rst = this.query(query);
 }

 async listMonit(query) {
  const rst = this.query(query)
 }
}