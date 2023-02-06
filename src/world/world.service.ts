import { HttpException, Injectable } from "@nestjs/common";
import { createOrderParams, sendFail, sendOk } from "../libs/utils/functionReturn";
import { makeErrorInfoObjForHttpException } from "../libs/utils/globalErrorHandler";
import { WorldCountry } from "../entities/worldCountry.entity";
import { WorldState } from "../entities/worldState.entity";
import { WorldCity } from "../entities/worldCity.entity";
import { WorldCountryRepository, WorldStateRepository, WorldCityRepository, IWorldCount } from "./world.repository";
import {IResultReturn} from "../interface/interface";

interface IWorldData {
  totalCount: number;
  listCount: number;
  list: WorldCountry[] | WorldState[] | WorldCity[];
}

@Injectable()
export class WorldService {
  constructor(
    private worldCountryRepository: WorldCountryRepository,
    private worldStateRepository: WorldStateRepository,
    private worldCityRepository: WorldCityRepository,
  ) {}

  private readonly totalCount: string = "totalCount";

  /**
   * 전세계 국가 코드 조회
   * @param {number} pageNo 페이지번호
   * @param {number} pageSize 목록개수
   * @param {string} sortColumn 정렬컬럼
   * @param {boolean} isDecending 내림차순여부
   */
  async listWorldCountry(
    pageNo: number,
    pageSize: number,
    sortColumn: string,
    isDecending: boolean,
  ): Promise<IResultReturn> {
    try {
      // 전체 worldCountry 개수
      const totalWorldCountryCount: IWorldCount = await this.worldCountryRepository.totalWorldCountryCount(
        this.totalCount,
      );

      const { totalCount } = totalWorldCountryCount;

      // pageSize ||= pageNo ? Math.round(totalCount / pageNo) : 9999;
      // sortColumn ||= "name";
      // const offset: number = !pageNo ? 0 : pageSize * (pageNo - 1);
      // const sortOption: string = isDecending ? "ASC" : "DESC";

      pageSize = createOrderParams({ key: "pageSize", elem1: pageNo, elem2: totalCount });
      sortColumn = createOrderParams({ key: "sortColumn", elem1: sortColumn });
      const offset = createOrderParams({ key: "offset", elem1: pageNo, elem2: pageSize });
      const sortOption = createOrderParams({ key: "sortOption", elem1: isDecending });

      const listWorldCountry: WorldCountry[] = await this.worldCountryRepository.listWorldCountry(
        pageSize,
        sortColumn,
        offset,
        sortOption,
      );

      if (listWorldCountry) {
        const result: IWorldData = {
          totalCount: totalCount,
          listCount: listWorldCountry.length,
          list: listWorldCountry,
        };

        return sendOk("SUCCESS", result);
      }
      return sendFail("FAIL", null);
    } catch (e) {
      const errorInfo = makeErrorInfoObjForHttpException(WorldService.name, "listWorldCountry", e);
      throw new HttpException(errorInfo, 200);
    }
  }

  /**
   * 특정 국가의 주 코드 조회
   * @param {number} countryId 국가ID
   * @param {number} pageNo 페이지번호
   * @param {number} pageSize 목록개수
   * @param {string} sortColumn 정렬컬럼
   * @param {boolean} isDecending 내림차순여부
   */
  async listWorldState(
    countryId: number,
    pageNo: number,
    pageSize: number,
    sortColumn: string,
    isDecending: boolean,
  ): Promise<IResultReturn> {
    try {
      // 전체 worldState 개수
      const totalWorldStateCount: IWorldCount = await this.worldStateRepository.totalWorldStateCount(
        this.totalCount,
        countryId,
      );

      const { totalCount } = totalWorldStateCount;

      pageSize = createOrderParams({ key: "pageSize", elem1: pageNo, elem2: totalCount });
      sortColumn = createOrderParams({ key: "sortColumn", elem1: sortColumn });
      const offset = createOrderParams({ key: "offset", elem1: pageNo, elem2: pageSize });
      const sortOption = createOrderParams({ key: "sortOption", elem1: isDecending });

      const data = {
        pageSize: pageSize,
        sortColumn: sortColumn,
        offset: offset,
        sortOption: sortOption,
        countryId: countryId,
      };

      const listWorldState: WorldState[] = await this.worldStateRepository.listWorldState(data);

      if (listWorldState) {
        const result: IWorldData = {
          totalCount: totalCount,
          listCount: listWorldState.length,
          list: listWorldState,
        };
        return sendOk("SUCCESS", result);
      }
      return sendFail("FAIL", null);
    } catch (e) {
      const errorInfo = makeErrorInfoObjForHttpException(WorldService.name, "listWorldCountry", e);
      throw new HttpException(errorInfo, 200);
    }
  }

  /**
   * 특정 국가, 특정 주의 도시 코드 조회
   * @param {number} stateId 주ID
   * @param {number} countryId 국가ID
   * @param {number} pageNo 페이지번호
   * @param {number} pageSize 목록개수
   * @param {string} sortColumn 정렬컬럼
   * @param {boolean} isDecending 내림차순여부
   */
  async listWorldCity(
    stateId: number,
    countryId: number,
    pageNo: number,
    pageSize: number,
    sortColumn: string,
    isDecending: boolean,
  ): Promise<IResultReturn> {
    try {
      // 전체 WorldCity 개수
      const totalWorldCityCount: IWorldCount = await this.worldCityRepository.totalWorldCityCount(
        this.totalCount,
        stateId,
        countryId,
      );

      const { totalCount } = totalWorldCityCount;

      pageSize = createOrderParams({ key: "pageSize", elem1: pageNo, elem2: totalCount });
      sortColumn = createOrderParams({ key: "sortColumn", elem1: sortColumn });
      const offset = createOrderParams({ key: "offset", elem1: pageNo, elem2: pageSize });
      const sortOption = createOrderParams({ key: "sortOption", elem1: isDecending });

      const data = {
        pageSize: pageSize,
        sortColumn: sortColumn,
        offset: offset,
        sortOption: sortOption,
        countryId: countryId,
        stateId: stateId,
      };

      const listWorldCity = await this.worldCityRepository.listWorldCity(data);

      if (listWorldCity) {
        const result: IWorldData = {
          totalCount: totalCount,
          listCount: listWorldCity.length,
          list: listWorldCity,
        };
        return sendOk("SUCCESS", result);
      }
      return sendFail("FAIL", null);
    } catch (e) {
      const errorInfo = makeErrorInfoObjForHttpException(WorldService.name, "listWorldCountry", e);
      throw new HttpException(errorInfo, 200);
    }
  }
}
