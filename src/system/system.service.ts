import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SystemRepository } from "./system.repository";
import { CreateSystemDto, UpdateSystemDto } from "./system.dto";
import { SystemMapper } from "./system.mapper";


@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(SystemRepository)
    private systemRepository: SystemRepository,
    private systemMapper: SystemMapper
  ) {
  }

  async insertSystem(venueId: string, createSystemDto: CreateSystemDto): Promise<boolean> {
    return this.systemRepository.onCreate(venueId, createSystemDto);
  }


  async updateSubinfoUpdatedAt(systemId: string): Promise<any> {
    let params = new Map<string, any>();
    params
      .set("id", systemId)
      .set("subinfo_updated_at", new Date(Date.now()));

    return this.systemMapper.updateSubinfoUpdatedAt(params);
  }
}
