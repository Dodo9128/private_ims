import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { IInsertChannelParams, IMakeContent, TEventStatus } from "../../interface/interface";

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

const makeContentExample: IMakeContent = {
  title: "title",
  description: "description",
  recording_name: "20210535_073215",
  start_frame_no: 600,
  end_frame_no: 1200,
  channel_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

export const makeContent = () =>
  applyDecorators(
    ApiOperation({
      summary: "컨텐츠 등록",
      description: `
<p><strong>4DDM에서 컨텐츠를 등록하는 API</strong></p>\n
<p>[컨텐츠 등록절차]</p>\n
<ol>\n
<li>[4DPD--&gt;IMS]4DPD에서 아래와 같은 정보 담아서 IMS 호출\n
<ul>\n
<li>Path-Param\n
<ul>\n
<li>system_id</li>\n
<li>event_id</li>\n
</ul>\n
</li>\n
<li>Body-Param\n
<ul>\n
<li>json-object<br />\n
<pre>\n
{
"event_id": "0001A0001",
"title": "title",
"description": "description",
"recording_name": "20210535_073215",
"start_frame_no": 600,
"end_frame_no": 1200,
"channel_list": [1,2,3,4,5,6,7,8,9,10]
}\n
</pre>\n
</li>\n
</ul>\n
</li>\n
</ul>\n
</li>\n
<li>[IMS--&gt;CMS]동일venue상의 모든&nbsp; 4DRM 서버 정보(ip:port) 를 list형태로 담아서 IMS가 CMS-Worker 호출\n
<ul>\n
<li>Body-Param\n
<ul>\n
<li>json-object<br />\n
<pre>\n
{
"event_id": "0001A0001",
"title": "title",
"description": "description",
"recording_name": "20210535_073215",
"start_frame_no": 600,
"end_frame_no": 1200,
"channel_list": [1,2,3,4,5,6,7,8,9,10],
"rm_list": ["192.168.0.125:5010", "192.168.1.126:5010"]
}\n
</pre>\n
</li>\n
</ul>\n
</li>\n
<li>CMS-Worker는 IMS서버상에 instance 떠 있는 상태(http://localhost:3000/XXXXXX)</li>\n
</ul>\n
</li>\n
<li>[CMS--&gt;4DRM들]\n
<ul>\n
<li>4DRM으로 Muxing 요청</li>\n
<li>http://{4drm_ip}:{4drm_port}/4dapp/movie/vod/muxing</li>\n
<li>Body-Param\n
<ul>\n
<li>json-object<br />\n
<pre>\n
{
"event_id": "0001A0001",
"content_id": "00000001",
"start_frame_no": 600,
"end_frame_no": 1200,
"fps": 30.0,
"width": 1920,
"height": 1080,
"reporting_path": "/path/to/result/reporting"
}\n
</pre>\n
</li>\n
</ul>\n
</li>\n
<li>content_id을 파일명으로 먹싱 파일 생성</li>\n
<li>[4DRM--&gt;CMS]\n
<ul>\n
<li>생성 완료 후 CMS로 API 호출</li>\n
<li>4DRM에서 완료 결과를 CMS의 reporting_path로 응답</li>\n
<li>http://{kiosk_ip}:{kiosk_port}{reporting_path}</li>\n
</ul>\n
</li>\n
</ul>\n
</li>\n
<li>[CMS--&gt;IMS]\n
<ul>\n
<li>CMS에서 처리한 상태값들을 IMS에서 저장한다.\n
<ul>\n
<li>CMS에서 4DRM들에게 전송한 이후</li>\n
<li>모든 4DRM에서 CMS로 리턴된 이후</li>\n
<li>CMS에서 파일 생성이 완료되어 URL이 생성된 경우</li>\n
</ul>\n
</li>\n
<li>http://{ims_ip}:{ims_port}/cms/{event_id}/{status}/setMuxingStatus</li>\n
</ul>\n
</li>\n
</ol>\n
<p><img src="/resources/img/api_doc/01_4DPD_makeContent.png" /></p>`,
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
      name: "param",
      required: true,
      description: "makeContent params",
      schema: {
        type: "string",
        example: makeContentExample,
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

export const setChannelStatus = () =>
  applyDecorators(
    ApiOperation({
      summary: "카메라 사용 유무 설정",
      description: `카메라의 사용 유무값을 설정합니다.<p><img src="/resources/img/api_doc/01_4DPD_setChannelStatus.png" /></p>`,
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
      name: "live_index",
      required: true,
      description: "channel의 live_index값. channel_id 와 다름<br>ex)13",
      schema: {
        type: "number",
        example: "13",
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

export const makeHlsContent = () =>
  applyDecorators(
    ApiOperation({
      summary: "컨텐츠 등록 (HLS iVod 생성)",
      description: `
<p><strong>4DDM에서 컨텐츠를 등록하는 API (HLS)</strong></p>\n
<p>[컨텐츠 등록절차]</p>\n
<ol>\n
<li>[4DPD--&gt;IMS]4DPD에서 아래와 같은 정보 담아서 IMS 호출\n
<ul>\n
<li>Path-Param\n
<ul>\n
<li>system_id</li>\n
<li>event_id</li>\n
</ul>\n
</li>\n
<li>Body-Param\n
<ul>\n
<li>json-object<br />\n
<pre>\n
{
 "event_id": "0001A0001",
 "title": "title",
 "description": "description",
 "recording_name": "20210535_073215",
 "start_frame_no": 600,
 "end_frame_no": 1200,
 "channel_list": [1,2,3,4,5,6,7,8,9,10]
}\n
</pre>\n
</li>\n
</ul>\n
</li>\n
</ul>\n
</li>\n
<li>[IMS--&gt;CMS]동일venue상의 모든&nbsp; 4DRM 서버 정보(ip:port) 를 list형태로 담아서 IMS가 CMS-Worker 호출\n
<ul>\n
<li>Body-Param\n
<ul>\n
<li>json-object<br />\n
<pre>\n
{
    "event_id": "0001A0001",
    "title": "title",
    "description": "description",
    "recording_name": "20210535_073215",
    "start_frame_no": 600,
    "end_frame_no": 1200,
    "channel_list": [1,2,3,4,5,6,7,8,9,10],
    "rm_list": ["192.168.0.125:5010", "192.168.1.126:5010"]
}\n
</pre>\n
</li>\n
</ul>\n
</li>\n
<li>CMS-Worker는 IMS서버상에 instance 떠 있는 상태(http://localhost:3000/XXXXXX)</li>\n
</ul>\n
</li>\n
<li>[CMS--&gt;4DRM들]\n
<ul>\n
<li>4DRM으로 Muxing 요청</li>\n
<li>http://{4drm_ip}:{4drm_port}/4dapp/movie/vod/muxing</li>\n
<li>Body-Param\n
<ul>\n
<li>json-object<br />\n
<pre>\n
{
\t\t\t\t"event_id": "0001A0001",
\t\t\t\t"content_id": "00000001",
\t\t\t\t"start_frame_no": 600,
\t\t\t\t"end_frame_no": 1200,
\t\t\t\t"fps": 30.0,
\t\t\t\t"width": 1920,
\t\t\t\t"height": 1080,
\t\t\t\t"reporting_path": "/path/to/result/reporting"
}\n
</pre>\n
</li>\n
</ul>\n
</li>\n
<li>content_id을 파일명으로 먹싱 파일 생성</li>\n
<li>[4DRM--&gt;CMS]\n
<ul>\n
<li>생성 완료 후 CMS로 API 호출</li>\n
<li>4DRM에서 완료 결과를 CMS의 reporting_path로 응답</li>\n
<li>http://{kiosk_ip}:{kiosk_port}{reporting_path}</li>\n
</ul>\n
</li>\n
</ul>\n
</li>\n
<li>[CMS--&gt;IMS]\n
<ul>\n
<li>CMS에서 처리한 상태값들을 IMS에서 저장한다.\n
<ul>\n
<li>CMS에서 4DRM들에게 전송한 이후</li>\n
<li>모든 4DRM에서 CMS로 리턴된 이후</li>\n
<li>CMS에서 파일 생성이 완료되어 URL이 생성된 경우</li>\n
</ul>\n
</li>\n
<li>http://{ims_ip}:{ims_port}/cms/{event_id}/{status}/setMuxingStatus</li>\n
</ul>\n
</li>\n
</ol>\n
<p><img src="/resources/img/api_doc/01_4DPD_makeContent.png" /></p>
`,
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
      name: "param",
      required: true,
      description: "makeHlsContent params",
      schema: {
        type: "string",
        example: makeContentExample,
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

export const getNode4DRS = () =>
  applyDecorators(
    ApiOperation({
      summary: `시스템 설정 조회`,
      description: `4DRS에서 시스템 설정하기 위한 정보들을 조회한다.\n<p><img src="/resources/img/api_doc/02_4DRS_getSystemFor4DRS.png" /></p>`,
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
