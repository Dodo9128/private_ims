import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { CONTENT_ID, EVENT_ID, SCHEDULED_AT, SYSTEM_ID } from "../../global/constant";

// TODO: API decorator swagger return params create / add

export const getLiveEventId = () =>
  applyDecorators(
    ApiOperation({ summary: `event_id 조회`, description: `사용가능한 event 정보를 리턴한다. live & public` }),
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

export const makeNewNotLiveEvent = () =>
  applyDecorators(
    ApiOperation({ summary: `make new not live event`, description: `` }),
    ApiParam({
      name: SYSTEM_ID,
      required: true,
      description: "IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A",
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiParam({
      name: CONTENT_ID,
      required: false,
      description: `IMS의 event_id와 대응되는 CMS의 컨텐츠 ID<br>ex)123`,
      schema: {
        default: 0,
        type: "number",
        example: 123,
      },
    }),
    ApiQuery({
      name: SCHEDULED_AT,
      required: false,
      description: `**필수값이 아닙니다!**\n<br> live 이벤트 시작 시간 설정 <br>시간 입력은 지역과 관계없이 UTC로 입력한다.<br>ex) 한국(KST = UTC+9)에서 진행하는 이벤트, 2022-04-04 14:00 인 경우 >> 2022-04-04 05:00 로 입력\n<br>    미국 서부(PST = UTC-8)에서 진행하는 이벤트, 2022-04-04 14:00 인 경우 >> 2022-04-04 22:00 로 입력<br>`,
      schema: {
        // type: "string",
        default: null,
        type: "string",
        example: "2022-04-04 14:00",
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

export const getGroupChannelForMobile = () =>
  applyDecorators(
    ApiOperation({
      summary: `시스템 설정 조회`,
      description: `<p>\n<strong>Mobile에서 사용할 그룹/채널 정보를 CMS가 조회하여 전달한다.</strong>\n</p>`,
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

export const updateContentIdByEventId = () =>
  applyDecorators(
    ApiOperation({
      summary: `update content_id by event_id`,
      description: ``,
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
    ApiQuery({
      name: EVENT_ID,
      required: true,
      description: "IMS에서 전달된 초기 event ID 값<br>ex)0001A0001",
      schema: {
        type: "string",
        example: "0001A0001",
      },
    }),
    ApiQuery({
      name: CONTENT_ID,
      required: true,
      description: `CMS의 경기 ID<br>ex)356`,
      schema: {
        type: "number",
        example: 356,
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
