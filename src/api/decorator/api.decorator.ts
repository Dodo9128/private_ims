import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { IInsertChannelParams, TEventStatus } from "../../interface/interface";

// TODO: API decorator swagger return params create / add

const insertChannelExample: IInsertChannelParams = {
  system_id: "0001A",
  channel_list: [
    { name: "CAMERA-0001", index: 1, ip: "10.1.3.12" },
    { name: "CAMERA-0002", index: 2, ip: "10.1.3.14" },
    { name: "CAMERA-0003", index: 3, ip: "10.1.3.16" },
    { name: "CAMERA-0004", index: 4, ip: "10.1.3.18" },
    { name: "CAMERA-0005", index: 5, ip: "10.1.3.20" },
    { name: "CAMERA-0006", index: 6, ip: "10.1.3.22" },
  ],
};

export const insertChannelIP = () =>
  applyDecorators(
    ApiOperation({
      summary: `[보류]전체 카메라 index, ip 저장`,
      description: `전체 카메라 live_index, ip 정보를 저장한다.`,
    }),
    ApiQuery({
      name: "system_id",
      required: true,
      description: "system_id",
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiQuery({
      name: "channel_list",
      required: true,
      description: "channel_list",
      schema: {
        type: "object",
        // example: `[\\n"\t\t\t\t+ "{name:\\"CAMERA-0001\\",index:1,ip:\\"10.1.3.12\\"},\\n"\t\t\t\t+ "{name:\\"CAMERA-0002\\",index:2,ip:\\"10.1.3.14\\"},\\n"\t\t\t\t+ "{name:\\"CAMERA-0003\\",index:3,ip:\\"10.1.3.16\\"},\\n"\t\t\t\t+ "{name:\\"CAMERA-0004\\",index:4,ip:\\"10.1.3.18\\"},\\n"\t\t\t\t+ "{name:\\"CAMERA-0005\\",index:5,ip:\\"10.1.3.20\\"},\\n"\t\t\t\t+ "{name:\\"CAMERA-0006\\",index:6,ip:\\"10.1.3.22\\"}\\n"\t\t\t\t+ "]`,
        example: insertChannelExample,
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

export const getGroupChannel = () =>
  applyDecorators(
    ApiOperation({
      summary: `시스템 설정 조회`,
      description: `<p>\n<strong>4DPD에서 시스템 설정하기 위한 정보들을 조회한다.</strong>\n</p>\n<p><img src="${__dirname}/01_4DPD_getSystemFor4DPD.png" /></p>`,
    }),
    ApiParam({
      name: "system_id",
      required: true,
      description: `IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A`,
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

export const getEventId = () =>
  applyDecorators(
    ApiOperation({
      summary: "event_id 조회",
      description: `<p>\n<strong>사용 가능한 event ID를 리턴한다.(live &amp; public)</strong>\n</p>\n<p>새로운 이벤트ID 발급은 아래 이벤트 리셋 API 참고</p>\n<ul>\n<li>/4dpd/{system_id}/{event_id}/reSet</li>\n</ul>\n<p>하나의 시스템에서 live &amp; public 인 이벤트ID는 1개만 존재한다.</p><p><img src="/resources/img/api_doc/01_4DPD_getEventId.png" /></p>`,
    }),
    ApiParam({
      name: "system_id",
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

export const setEventStatus = () =>
  applyDecorators(
    ApiOperation({
      summary: "event 시작/중지",
      description: `4DPD에서의 이벤트 시작 및 중지에 대해서 4DSS로 Notification 해준다.<p><img src="/resources/img/api_doc/01_4DPD_setEventStatus.png" /></p>`,
    }),
    ApiParam({
      name: "system_id",
      required: true,
      description: "IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A",
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiParam({
      name: "event_id",
      required: true,
      description: "IMS로부터 부여받은 이벤트 ID 값<br>ex)0001A0001",
      schema: {
        type: "string",
        example: "0001A0001",
      },
    }),
    ApiParam({
      name: "status",
      required: true,
      description: "상태값[resume/pause/end]",
      enum: ["resume", "pause", "end"],
      schema: {
        // type: "string",
        type: "string",
        example: "resume",
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

export const reSet = () =>
  applyDecorators(
    ApiOperation({
      summary: "event 리셋 (신규 event_id 발급)",
      description: `
<p>
<strong>기존 사용중이던 event_id를 종료(Finished &amp; non public) 시키고
새로운 event_id를 발급한다.</strong>
</p>
<p>새로운 발급된 event_id 값은 아래 API 참고(재호출 필요함)</p>
<ul>
<li>​/4dpd​/{system_id}​/getEventId</li>
</ul>
<p>하나의 시스템에서 live &amp; public 인 이벤트ID는 1개만 존재한다.</p>
<p><img src=/resources/img/api_doc/01_4DPD_reSet.png /></p>`,
    }),
    ApiParam({
      name: "system_id",
      required: true,
      description: "IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A",
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiParam({
      name: "event_id",
      required: true,
      description: "IMS로부터 부여받은 이벤트 ID 값<br>ex)0001A0001",
      schema: {
        type: "string",
        example: "0001A0001",
      },
    }),
    ApiQuery({
      name: "scheduled_at",
      required: true,
      description: `live 이벤트 시작 시간 설정 <br>시간 입력은 지역과 관계없이 UTC로 입력한다.\n<br>ex) 한국(KST = UTC+9)에서 진행하는 이벤트, 2022-04-04 14:00 인 경우 >> 2022-04-04 05:00 로 입력\n\t\t\t\t\t<br>미국 서부(PST = UTC-8)에서 진행하는 이벤트, 2022-04-04 14:00 인 경우 >> 2022-04-04 22:00 로 입력`,
      schema: {
        // type: "string",
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
