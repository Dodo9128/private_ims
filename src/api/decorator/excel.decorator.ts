import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { SYSTEM_ID, VENUE_ID } from "../../global/constant";

// TODO: API decorator swagger return params create / add

export const exportVenueExcel = () =>
  applyDecorators(
    ApiOperation({
      summary: `VENUE EXCEL EXPORT`,
      description: `**[VENUE]** 현재 DB 데이터를 토대로 **VENUE** 관련 정보를 파일로 다운로드합니다.`,
    }),
    ApiParam({
      name: `${VENUE_ID}`,
      required: true,
      description: "베뉴 ID",
      schema: {
        type: "string",
        example: "0001",
      },
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
      required: true,
      description: "시스템 ID",
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiOkResponse({
      description: "OK !!",
      schema: {
        type: "string",
        example: "Download Excel file with Current Venue Info",
      },
    }),
    ApiResponse({
      status: 400,
      description: "BAD REQUEST !!",
      schema: {
        type: "string",
        example: "Fail",
      },
    }),
  );

export const exportCameraGroupExcel = () =>
  applyDecorators(
    ApiOperation({
      summary: `CAMERA GROUP EXCEL EXPORT`,
      description: `**[CAMERA GROUP]** 현재 DB 데이터를 토대로 **CAMERA GROUP** 관련 정보를 파일로 다운로드합니다.`,
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
      required: true,
      description: "시스템 ID",
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiOkResponse({
      description: "OK !!",
      schema: {
        type: "string",
        example: "Download Excel file with Current Camera Group Info",
      },
    }),
    ApiResponse({
      status: 400,
      description: "BAD REQUEST !!",
      schema: {
        type: "string",
        example: "Fail",
      },
    }),
  );
