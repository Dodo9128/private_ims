import { HttpException, Injectable } from "@nestjs/common";
import { createOrderParams, sendFail, sendOk } from "../libs/utils/functionReturn";
import { makeErrorInfoObjForHttpException } from "../libs/utils/globalErrorHandler";
import { IResultReturn } from "../global/interface";
import * as ExcelJS from "exceljs";
import { venueExportNodeDataAdd, venueExportRuleDataAdd, venueExportScaleDataAdd, venueExportSystemDataAdd, venueExportVenueDataAdd } from "../libs/utils/excelFunctions";
import { ExcelRepository } from "./excel.repository";

@Injectable()
export class ExcelService {
  // TODO: system, node, rule, scale 관련 엔드포인트 및 로직 작성 후 엑셀에서 임포트 되는 값으로 각각 생성하는 로직 작성 필요
  constructor(private readonly excelRepository: ExcelRepository) {}

  async exportExcel(venueId: string, systemId: string, res) {
    try {
      /**
       * TODO: Excel Export Query Making
       * Pseudo Code
       * --------------------------------
       * 1. ~~ repository에 excel에 들어가야 할 정보들(venue, system, rule, scale, node) 에 대한 쿼리를 짠다 ~~
       * 2. ~~ 스켈레톤 excel 파일 복사, 네이밍만 변경해서 새로운 파일 떨굼 ~~
       * 3. ~~ 새롭게 만들어낸 파일에 Get해온 자료를 위치에 맞게 write ~~
       * 4. ~~ 새롭게 만들어낸 파일 response ~~
       */
      let pseudoCode;

      const exportVenue = await this.excelRepository.getExcelExportVenue(venueId);
      const venueCountryId = await this.excelRepository.getWorldCountryName(exportVenue.country_id);
      const venueStateId = await this.excelRepository.getWorldStateName(exportVenue.state_id);
      const venueCityId = await this.excelRepository.getWorldCityName(exportVenue.city_id);

      // exportVenue 내부 값을 world 관련 데이터셋에서 매칭하여 excel에 필요한 내용으로 바꿔줌
      if (venueCountryId) {
        exportVenue.country_id = venueCountryId.name;
      }
      if (venueStateId) {
        exportVenue.state_id = venueStateId.name;
      }
      if (venueCityId) {
        exportVenue.city_id = venueCityId.name;
      }

      const exportSystem = await this.excelRepository.getExcelExportSystem(systemId);
      const exportRule = await this.excelRepository.getExcelExportRule(systemId);
      const exportScale = await this.excelRepository.getExcelExportScale(systemId);
      const exportNode = await this.excelRepository.getExcelExportNode(systemId);

      // system.is_extra, rule.node_type match with code_common description
      const systemIsExtra = await this.excelRepository.getFncCodeDesc(exportSystem.is_extra);
      const ruleNodeType = await this.excelRepository.getFncCodeName(exportRule.node_type);

      // exportSystem, exportRule 내부 code 값 code_common 의 description으로 변환
      exportSystem.is_extra = systemIsExtra[0][`${Object.keys(systemIsExtra[0])}`];
      exportRule.node_type = ruleNodeType[0][`${Object.keys(ruleNodeType[0])}`];

      // exportNode 변환
      for (const eachNode of exportNode) {
        if (eachNode.node_type !== "" && eachNode.node_type) {
          const newNodeType = await this.excelRepository.getFncCodeName(eachNode.node_type);
          eachNode.node_type = newNodeType[0][`${Object.keys(newNodeType[0])}`];
        }
        if (eachNode.is_origin !== "" && eachNode.is_origin) {
          const newIsOrigin = await this.excelRepository.getFncCodeDesc(eachNode.is_origin);
          eachNode.is_origin = newIsOrigin[0][`${Object.keys(newIsOrigin[0])}`];
        }
        if (eachNode.ls_type !== "" && eachNode.ls_type) {
          const newLsType = await this.excelRepository.getFncCodeDesc(eachNode.ls_type);
          eachNode.ls_type = newLsType[0][`${Object.keys(newLsType[0])}`];
        }
        if (eachNode.ml_type !== "" && eachNode.ml_type) {
          const newMlType = await this.excelRepository.getFncCodeDesc(eachNode.ml_type);
          eachNode.ml_type = newMlType[0][`${Object.keys(newMlType[0])}`];
        }
        if (eachNode.deploy_type !== "" && eachNode.deploy_type) {
          const newDeployType = await this.excelRepository.getFncCodeDesc(eachNode.deploy_type);
          eachNode.deploy_type = newDeployType[0][`${Object.keys(newDeployType[0])}`];
        }
        if (eachNode.initial_state !== "" && eachNode.initial_state) {
          const newInitialState = await this.excelRepository.getFncCodeDesc(eachNode.initial_state);
          eachNode.initial_state = newInitialState[0][`${Object.keys(newInitialState[0])}`];
        }
      }

      const preCurrentDate = new Date();
      const timeHour =
        preCurrentDate.getHours().toString().length === 2 ? preCurrentDate.getHours() : "0" + preCurrentDate.getHours();
      const timeMinute =
        preCurrentDate.getMinutes().toString().length === 2
          ? preCurrentDate.getMinutes()
          : "0" + preCurrentDate.getMinutes();

      const preCurrentTime = `${preCurrentDate.getFullYear()}-${
        preCurrentDate.getMonth() + 1
      }-${preCurrentDate.getDate()}_${timeHour}${timeMinute}`;

      const preFileName = `./src/database/seeds/IMS_VENUE_SYSTEM_INFO_ADD_SKELETON.xlsx`;
      const downloadFileName = `${process.env.HOSTNAME}_${systemId}_INFO_${preCurrentTime}`;

      const newWorkbook = new ExcelJS.Workbook();

      // Skeleton 엑셀 파일의 정보 불러와 새로운 workbook 생성
      const loadWorkbook = await newWorkbook.xlsx.readFile(preFileName);

      // 편집할 dev sheet load
      const devWorkSheet = await newWorkbook.getWorksheet("dev");

      const venueRow = devWorkSheet.getRow(4);
      const systemRow = devWorkSheet.getRow(5);
      const ruleRow = devWorkSheet.getRow(6);
      const scaleRow = devWorkSheet.getRow(7);

      venueExportVenueDataAdd(exportVenue, venueRow);
      venueExportSystemDataAdd(exportSystem, systemRow);
      venueExportRuleDataAdd(exportRule, ruleRow);
      venueExportScaleDataAdd(exportScale, scaleRow);
      venueExportNodeDataAdd(exportNode, devWorkSheet);

      // controller 말고 여기서 직접 file send 하는 것으로 마무리
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=" + `${downloadFileName}.xlsx`);

      await newWorkbook.xlsx.write(res);
      res.end();
    } catch (e) {
      const errorInfo = makeErrorInfoObjForHttpException(ExcelService.name, "exportExcel", e);
      throw new HttpException(errorInfo, 200);
    }
  }
}
