import { HttpException, Injectable } from "@nestjs/common";
import { createOrderParams, sendFail, sendOk } from "../libs/utils/functionReturn";
import { makeErrorInfoObjForHttpException } from "../libs/utils/globalErrorHandler";
import { IResultReturn } from "../global/interface";
import * as ExcelJS from "exceljs";
import {
  cameraGroupExportStarter,
  downloadFileNameMakerForCameraGroup,
  downloadFileNameMakerForVenue,
  venueExportNodeDataAdd,
  venueExportRuleDataAdd,
  venueExportScaleDataAdd,
  venueExportSystemDataAdd,
  venueExportVenueDataAdd,
} from "../libs/utils/excelFunctions";
import { ExcelRepository } from "./excel.repository";

@Injectable()
export class ExcelService {
  // TODO: system, node, rule, scale 관련 엔드포인트 및 로직 작성 후 엑셀에서 임포트 되는 값으로 각각 생성하는 로직 작성 필요
  constructor(private readonly excelRepository: ExcelRepository) {}

  async exportVenueExcel(venueId: string, systemId: string, res) {
    try {
      // 입력받은 systemId가 venue에 속해 있지 않을 경우 (return 불가능)
      if (!systemId.includes(venueId)) {
        // // custom Error 만드는 법
        // const systemIdVenueIdMatchingErr = new Error();
        // const errMsg = "venueId & systemId matching Fail";
        // const errorInfo = makeErrorInfoObjForHttpException(
        //   ExcelService.name,
        //   "exportVenueExcel",
        //   systemIdVenueIdMatchingErr,
        //   errMsg,
        // );
        // throw new HttpException(errorInfo, 200);

        return res.status(200).json({ result: "FAIL", message: "venueId & systemId matching Fail", data: null });
      }
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

      const preFileName = `./src/database/seeds/IMS_VENUE_SYSTEM_INFO_ADD_SKELETON.xlsx`;
      const downloadFileName = downloadFileNameMakerForVenue(systemId);

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
      const errorInfo = makeErrorInfoObjForHttpException(ExcelService.name, "exportVenueExcel", e);
      throw new HttpException(errorInfo, 200);
    }
  }

  async exportCameraGroupExcel(systemId: string, res) {
    try {
      const exportNode = await this.excelRepository.getExcelExportNodeForCameraGroup(systemId);
      for (const elem of exportNode) {
        const newNodeType = await this.excelRepository.getFncCodeDesc(elem.node_type);
        const nodeType = newNodeType[0][`${Object.keys(newNodeType[0])}`];
        elem.node_type = nodeType;
      }

      const exportChannel = await this.excelRepository.getExcelExportChannel(systemId);
      for (const elem of exportChannel) {
        const newStatus = await this.excelRepository.getFncCodeDesc(elem.status);
        const newMediaType = await this.excelRepository.getFncCodeDesc(elem.media_type);
        const newGimbalPreset = await this.excelRepository.getFncCodeDesc(elem.gimbal_preset);

        const status = `${newStatus[0][`${Object.keys(newStatus[0])}`][0]}${newStatus[0][`${Object.keys(newStatus[0])}`]
          .slice(1)
          .toLowerCase()}`;

        const mediaType = `${newMediaType[0][`${Object.keys(newMediaType[0])}`][0]}${newMediaType[0][
          `${Object.keys(newMediaType[0])}`
        ]
          .slice(1)
          .toLowerCase()}`;

        const gimbalPreset = newGimbalPreset[0][`${Object.keys(newGimbalPreset[0])}`];

        elem.status = status;
        elem.media_type = mediaType;
        elem.gimbal_preset = gimbalPreset;
      }

      const exportGroup = await this.excelRepository.getExcelExportGroup(systemId);

      for (const elem of exportGroup) {
        const newViewType = await this.excelRepository.getFncCodeDesc(elem.view_type);
        const newType = await this.excelRepository.getFncCodeDesc(elem.type);
        const newExternalGroup = await this.excelRepository.getFncCodeDesc(elem.external_group);
        const newDefaultGroup = await this.excelRepository.getFncCodeDesc(elem.default_group);
        const newInteractive = await this.excelRepository.getFncCodeDesc(elem.interactive);
        const newReplay = await this.excelRepository.getFncCodeDesc(elem.replay);
        const newTimemachine = await this.excelRepository.getFncCodeDesc(elem.timemachine);
        const newPdview = await this.excelRepository.getFncCodeDesc(elem.pdview);

        const viewType = newViewType[0][`${Object.keys(newViewType[0])}`];
        const type = `${newType[0][`${Object.keys(newType[0])}`][0]}${newType[0][`${Object.keys(newType[0])}`]
          .slice(1)
          .toLowerCase()}`;
        const externalGroup = newExternalGroup[0][`${Object.keys(newExternalGroup[0])}`];
        const defaultGroup = newDefaultGroup[0][`${Object.keys(newDefaultGroup[0])}`];
        const interactive = newInteractive[0][`${Object.keys(newInteractive[0])}`];
        const replay = newReplay[0][`${Object.keys(newReplay[0])}`];
        const timemachine = newTimemachine[0][`${Object.keys(newTimemachine[0])}`];
        const pdview = newPdview[0][`${Object.keys(newPdview[0])}`];

        elem.view_type = viewType;
        elem.type = type;
        elem.external_group = externalGroup;
        elem.default_group = defaultGroup;
        elem.interactive = interactive;
        elem.replay = replay;
        elem.timemachine = timemachine;
        elem.pdview = pdview;
      }

      const exportVideo = await this.excelRepository.getExcelExportVideo(systemId);
      const videoData = {};
      let videoGroupIdx = 1;
      let lastVideoGroupId;

      for (let i = 0; i < exportVideo.length; i++) {
        const elem = exportVideo[i];

        if (!lastVideoGroupId) {
          lastVideoGroupId = elem.group_id;
        }

        const newIsInput = await this.excelRepository.getFncCodeDesc(elem.is_input);
        elem.is_input = newIsInput[0][`${Object.keys(newIsInput[0])}`];
        elem.fps = Number(elem.fps).toFixed(2);

        const groupId = elem.group_id;
        if (lastVideoGroupId === groupId && i === 0) {
          videoData[`${videoGroupIdx}`] = [elem];
        } else if (lastVideoGroupId === groupId) {
          videoData[`${videoGroupIdx}`].push(elem);
        } else {
          videoGroupIdx++;
          videoData[`${videoGroupIdx}`] = [elem];
          lastVideoGroupId = groupId;
        }
      }

      let audioGroupIdx = 1;
      let lastAudioGroupId;

      const exportAudio = await this.excelRepository.getExcelExportAudio(systemId);
      const audioData = {};

      for (let i = 0; i < exportAudio.length; i++) {
        const elem = exportAudio[i];

        if (!lastAudioGroupId) {
          lastAudioGroupId = elem.group_id;
        }

        const newChannelType = await this.excelRepository.getFncCodeDesc(elem.channel_type);
        elem.channel_type = newChannelType[0][`${Object.keys(newChannelType[0])}`];
        const newIsInput = await this.excelRepository.getFncCodeDesc(elem.is_input);
        elem.is_input = newIsInput[0][`${Object.keys(newIsInput[0])}`];

        const groupId = elem.group_id;
        if (lastAudioGroupId === groupId && i === 0) {
          audioData[`${audioGroupIdx}`] = [elem];
        } else if (lastAudioGroupId === groupId) {
          audioData[`${audioGroupIdx}`].push(elem);
        } else {
          audioGroupIdx++;
          audioData[`${audioGroupIdx}`] = [elem];
          lastAudioGroupId = groupId;
        }
      }

      const exportAdaptiveStreaming = await this.excelRepository.getExcelExportAdaptiveStreaming(systemId);

      // adaptive streaming 정보가 없으면 return 해버린다
      if (Object.keys(exportAdaptiveStreaming).length === 0) {
        return res.status(200).json({ result: "FAIL", message: "There is no info in DB", data: null });
      }

      const adaptiveStreamingData = {};

      let adaptiveStreamingGroupIndex = 1;
      let lastGroupId;

      for (let i = 0; i < exportAdaptiveStreaming.length; i++) {
        const elem = exportAdaptiveStreaming[i];

        if (!lastGroupId) {
          lastGroupId = elem.group_id;
        }

        const newIsInput = await this.excelRepository.getFncCodeDesc(elem.is_input);
        elem.is_input = newIsInput[0][`${Object.keys(newIsInput[0])}`];
        elem.fps = Number(elem.fps).toFixed(2);

        const groupId = elem.group_id;
        if (lastGroupId === groupId && i === 0) {
          adaptiveStreamingData[`${adaptiveStreamingGroupIndex}`] = [elem];
        } else if (lastGroupId === groupId) {
          adaptiveStreamingData[`${adaptiveStreamingGroupIndex}`].push(elem);
        } else {
          adaptiveStreamingGroupIndex++;
          adaptiveStreamingData[`${adaptiveStreamingGroupIndex}`] = [elem];
          lastGroupId = groupId;
        }
      }

      /**
       * adaptiveStreamingData 의 내부에서
       * elem 배열의 객체 중 is_input이 Y 인 값들의 codec의 값의 종류 갯수가
       * 총 adaptive_streaming 그룹 개수
       */

      const adaptiveStreamingGroups = {};
      adaptiveStreamingGroups["1"] = adaptiveStreamingData["1"];
      const firstGroupCodec = adaptiveStreamingGroups["1"][0].codec;
      let firstGroupIndex = 1;

      for (let i = 1; i <= Object.keys(adaptiveStreamingData).length; i++) {
        for (let j = 0; j < adaptiveStreamingData[`${i}`].length; j++) {
          if (adaptiveStreamingData[`${i}`][j].is_input === "Y") {
            if (adaptiveStreamingData[`${i}`][j].codec !== firstGroupCodec) {
              adaptiveStreamingGroups[`${firstGroupIndex + 1}`] = adaptiveStreamingData[`${i}`];
              firstGroupIndex++;
            }
          }
        }
      }

      /**
       * Object.keys(adaptiveStreamingGroups).length 만큼의
       * adaptiveStreaming Group 이 있다.
       */

      const preFileName = `./src/database/seeds/IMS_CAMERA_GROUP_INFO_ADD_SKELETON.xlsx`;
      const downloadFileName = downloadFileNameMakerForCameraGroup(systemId);

      const newWorkbook = new ExcelJS.Workbook();

      // Skeleton 엑셀 파일의 정보 불러와 새로운 workbook 생성
      const loadWorkbook = await newWorkbook.xlsx.readFile(preFileName);

      // 편집할 IMS_그룹_채널정보_St sheet load
      const channelWorkSheet = await newWorkbook.getWorksheet("IMS_Group_Channel_Data");
      const adaptiveStreamingWorkSheet = await newWorkbook.getWorksheet("Adaptive Streaming");

      const dataSet = {
        systemId: systemId,
        node: exportNode,
        channel: exportChannel,
        group: exportGroup,
        video: videoData,
        audio: audioData,
        adaptiveStreaming: adaptiveStreamingGroups,
      };

      cameraGroupExportStarter(dataSet, channelWorkSheet, adaptiveStreamingWorkSheet);

      // controller 말고 여기서 직접 file send 하는 것으로 마무리
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=" + `${downloadFileName}.xlsx`);

      await newWorkbook.xlsx.write(res);
      res.end();
    } catch (e) {
      const errorInfo = makeErrorInfoObjForHttpException(ExcelService.name, "exportCameraGroupExcel", e);
      throw new HttpException(errorInfo, 200);
    }
  }
}
