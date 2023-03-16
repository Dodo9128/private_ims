import { Repository} from "typeorm";
import { AppDataSource } from "../database/dataSource";
import { WorldCountry } from "../entities/worldCountry.entity";
import { WorldState } from "../entities/worldState.entity";
import { WorldCity } from "../entities/worldCity.entity";
import { IWorldCount } from "../global/interface";
import {CustomRepository} from "../api/decorator/typeorm.decorator";


@CustomRepository(WorldCountry)
export class WorldCountryRepository extends Repository<WorldCountry> {
  async findById(id: number): Promise<WorldCountry> {
    return await this.findById(id);
  }

  async totalWorldCountryCount(totalCount: string): Promise<IWorldCount> {
    // return await this.query(`SELECT COUNT(1) FROM ${tableWorldCountry} ${tableForShortWC}
    //             WHERE 1=1
    //             `);

    const result: IWorldCount = await this.createQueryBuilder()
      .select("COUNT(1)", totalCount)
      .where("1=1")
      .getRawOne();

    return result;
  }

  async listWorldCountry(pageSize, sortColumn, offset, sortOption) {
    // return await this.query(
    //   `
    //       SELECT A.* FROM
    //     (
    //             SELECT
    //                     ${tableForShortWC}.id,
    //                     ${tableForShortWC}.name,
    //                     ${tableForShortWC}.iso3,
    //                     ${tableForShortWC}.iso2,
    //                     ${tableForShortWC}.phonecode,
    //                     ${tableForShortWC}.capital,
    //                     ${tableForShortWC}.currency,
    //                     ${tableForShortWC}.natives,
    //                     ${tableForShortWC}.flag,
    //                     ${tableForShortWC}.code
    //
    //             FROM    ${tableWorldCountry} ${tableForShortWC}
    //             WHERE   1=1
    //
    //             ORDER BY ${sortColumn} ${sortOption}
    //             LIMIT ${pageSize} OFFSET ${offset}
    //     ) A
    //     `,
    // );

    const result: WorldCountry[] = await this.createQueryBuilder()
      .select(["id", "name", "iso3", "iso2", "phonecode", "capital", "currency", "natives", "flag", "code"])
      .orderBy(`${sortColumn}`, sortOption)
      .limit(pageSize)
      .offset(offset)
      .getRawMany();

    return result;
  }
}

@CustomRepository(WorldState)
export class WorldStateRepository extends Repository<WorldState>{
  async totalWorldStateCount(totalCount: string, countryId: number) {
    const result: IWorldCount = await this.createQueryBuilder()
      .select("COUNT(1)", totalCount)
      .where("1=1")
      .andWhere(`country_id = :country_id`, { country_id: `${countryId}` })
      .getRawOne();
    return result;
  }

  async listWorldState(data) {
    const { pageSize, sortColumn, offset, sortOption, countryId } = data;

    const result: WorldState[] = await this.createQueryBuilder()
      .select(["id", "name", "country_id", "country_code", "fips_code", "iso2", "flag", "wiki_data_id"])
      .where("1=1")
      .andWhere(`country_id = :country_id`, { country_id: `${countryId}` })
      .orderBy(`${sortColumn}`, sortOption)
      .limit(pageSize)
      .offset(offset)
      .getRawMany();

    return result;
  }
}

@CustomRepository(WorldCity)
export class WorldCityRepository extends Repository<WorldCity>{
  async totalWorldCityCount(totalCount: string, stateId: number, countryId: number) {
    const result: IWorldCount = await this.createQueryBuilder()
      .select("COUNT(1)", totalCount)
      .where("1=1")
      .andWhere(`country_id = :country_id`, { country_id: countryId })
      .andWhere(`state_id = :state_id`, { state_id: stateId })
      .getRawOne();

    return result;
  }

  async listWorldCity(data) {
    const { pageSize, sortColumn, offset, sortOption, countryId, stateId } = data;

    const result: WorldCity[] = await this.createQueryBuilder()
      .select([
        "id",
        "name",
        "state_id",
        "state_code",
        "country_id",
        "country_code",
        "latitude",
        "longitude",
        "flag",
        "wiki_data_id",
      ])
      .where("1=1")
      .andWhere(`country_id = :country_id`, { country_id: countryId })
      .andWhere(`state_id = :state_id`, { state_id: stateId })
      .orderBy(`${sortColumn}`, sortOption)
      .limit(pageSize)
      .offset(offset)
      .getRawMany();
    return result;
  }
}
