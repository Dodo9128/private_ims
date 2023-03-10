import { InjectRepository } from "@nestjs/typeorm";
import { SystemRepository } from "./system.repository";
import * as MybatisMapper from "mybatis-mapper";
import { System } from "../entities/system.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

MybatisMapper.createMapper(['./src/database/sqlmapper/System.xml'])
const myBatisFormat: object = { language: 'sql' };

export class SystemMapper {
  constructor(
    @InjectRepository(SystemRepository)
    private systemRepository: SystemRepository,
  ) {}

  async listSystem(venue_id: string): Promise<any> {
    let params = new Map<string, any>();
    params
      .set("venue_id", venue_id);
    const query = MybatisMapper.getStatement('System', 'listSystem', Object.fromEntries(params), myBatisFormat);

    return await this.systemRepository.query(query);
  }

  async getMaxSystemId(): Promise<string> {
    let params = new Map<string, any>();
    params.set("id", null);
    const query = MybatisMapper.getStatement('System', 'getMaxSystemId', Object.fromEntries(params), myBatisFormat);

    return await this.systemRepository.query(query);
  }

  async updateSubinfoUpdatedAt(params: Map<string, any>): Promise<number> {
    const query = MybatisMapper.getStatement('System', 'updateSubinfoUpdatedAt', Object.fromEntries(params), myBatisFormat)

    return await this.systemRepository.query(query);
  }

  async getSystem(id: string): Promise<any> {
    let params = new Map<string, any>();
    params.set("id", id);

    const query = MybatisMapper.getStatement('System', 'getSystem', Object.fromEntries(params), myBatisFormat);
    const data = await this.systemRepository.query(query)

    return data[0];
  }

  async insertSystem(
    systemId: string,
    venueId: string,
    Data: Map<string, any>,
  ): Promise<System> {
    try {
      let system: System = new System();
      let system_id: string;

      if (systemId === null) {
        system_id = await this.systemRepository.makeSystemId(venueId);
      } else {
        system_id = systemId
      }

      system.id = system_id;
      system.name = Data.get("name");
      system.description = Data.get("description");
      system.fps = Data.get("fps");
      system.width = Data.get("width");
      system.height = Data.get("height");
      system.comment = Data.get("comment");
      system.is_extra = Data.get("is_extra");
      system.venue_id = venueId;
      system.registered_at = new Date(Date.now());

      return await this.systemRepository.save(system);

    } catch (error) {
      throw new HttpException({
          message: 'SQL error',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateSystem(
    systemId: string,
    venueId: string,
    Data: Map<string, any>
  ): Promise<any> {
    //나중에 확인해 본다.
    const systems: System = await this.getSystem(systemId);

    const system: System = new System();

    system.name = Data.get("name");
    system.description = Data.get("description");
    system.fps = Data.get("fps");
    system.width = Data.get("width");
    system.height = Data.get("height");
    system.comment = Data.get("comment");
    system.is_extra = Data.get("is_extra");
    system.venue_id = venueId;
    system.updated_at = new Date(Date.now());

    return await this.systemRepository.update({id: systemId}, system);
  } catch (err) {
    throw new HttpException({
      message: "SQL error",
      error: err.sqlMessage,
    },
    HttpStatus.FORBIDDEN,
    )
  }
}