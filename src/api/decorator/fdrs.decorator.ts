import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { IInsertChannelParams, IMakeContent, TEventStatus } from "../../global/interface";
import { SYSTEM_ID } from "../../global/constant";

// TODO: API decorator swagger return params create / add

export const getNode4DRS = () =>
  applyDecorators(
    ApiOperation({
      summary: `시스템 설정 조회`,
      description: `4DRS에서 시스템 설정하기 위한 정보들을 조회한다.\n<p><img src="/resources/img/api_doc/02_4DRS_getSystemFor4DRS.png" /></p>`,
    }),
    ApiParam({
      name: SYSTEM_ID,
      required: true,
      description: "IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A",
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiOkResponse({
      description: "OK !!",
      schema: {
        type: "string",
      },
    }),
    ApiResponse({
      status: 400,
      description: "BAD REQUEST !!",
      schema: {
        type: "string",
      },
    }),
  );
