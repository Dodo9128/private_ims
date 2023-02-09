import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import {
  DOMAIN,
  INITIAL_STATE,
  INSTANCE_ID,
  NODE_ID,
  PRIVATE_IP,
  PRIVATE_PORT,
  PUBLIC_IP,
  PUBLIC_PORT,
  REGION,
  SYSTEM_ID,
} from "../../global/constant";

// TODO: API decorator swagger return params create / add

export const nodeIp = () =>
  applyDecorators(
    ApiOperation({
      summary: `본인 노드 정보 조회`,
      description: `4DLS에서 시스템 설정하기 위해 자기 자신의 node 정보들을 조회한다. <p><img src="/resources/img/api_doc/04_4DLS_nodeIp.png" /></p>`,
    }),
    ApiParam({
      name: SYSTEM_ID,
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

export const get4DSS = () =>
  applyDecorators(
    ApiOperation({
      summary: `4DSS 정보 조회`,
      description: `4DLS에서 시스템 설정하기 위해 4DSS 정보를 조회한다. <p><img src="/resources/img/api_doc/04_4DLS_get4DSS.png" /></p>`,
    }),
    ApiParam({
      name: SYSTEM_ID,
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

export const getScale = () =>
  applyDecorators(
    ApiOperation({
      summary: `Scale 정보 조회`,
      description: `IMS에서 설정한 Scale out 정보를 조회한다. <p><img src="/resources/img/api_doc/04_4DLS_getScale.png" /></p>`,
    }),
    ApiParam({
      name: SYSTEM_ID,
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

export const scaleOut4DSS = () =>
  applyDecorators(
    ApiOperation({
      summary: `Scale Out`,
      description: `4DLS가 4DSS Scale Out 요청한다. <p><img src="/resources/img/api_doc/04_4DLS_scaleOut4DSS.png" /></p>`,
    }),
    ApiParam({
      name: SYSTEM_ID,
      required: true,
      description: `IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A`,
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiQuery({
      name: INSTANCE_ID,
      required: true,
      description: `instance_id<br>ex)i-0950f5a279a64a4fd`,
      schema: {
        type: "string",
        example: "i-0950f5a279a64a4fd",
      },
    }),
    ApiQuery({
      name: PRIVATE_IP,
      required: true,
      description: `private_ip<br>ex)175.116.17.219`,
      schema: {
        type: "string",
        example: "175.116.17.219",
      },
    }),
    ApiQuery({
      name: PRIVATE_PORT,
      required: true,
      description: `private_port<br>ex)8553`,
      schema: {
        type: "number",
        example: 8553,
      },
    }),
    ApiQuery({
      name: INITIAL_STATE,
      required: true,
      description: `initial_state<br>ex)temporary`,
      schema: {
        type: "string",
        example: "temporary",
      },
    }),
    ApiQuery({
      name: REGION,
      required: true,
      description: `region<br>ex)ap-northeast-2`,
      schema: {
        type: "string",
        example: "ap-northeast-2",
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

export const scaleOut4DSSOk = () =>
  applyDecorators(
    ApiOperation({
      summary: `Scale Out OK`,
      description: `Scale Out이 정상적으로 running일 경우, IP, PORT, domain 정보 업데이트 한다. <p><img src="/resources/img/api_doc/04_4DLS_scaleOut4DSSOk.png" /></p>`,
    }),
    ApiParam({
      name: SYSTEM_ID,
      required: true,
      description: `IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A`,
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiParam({
      name: NODE_ID,
      required: true,
      description: `node_id<br>ex)00000015`,
      schema: {
        type: "string",
        example: "00000015",
      },
    }),
    ApiQuery({
      name: PUBLIC_IP,
      required: true,
      description: `public_ip<br>ex)169.254.13.122`,
      schema: {
        type: "string",
        example: "169.254.13.122",
      },
    }),
    ApiQuery({
      name: PUBLIC_PORT,
      required: true,
      description: `public_port<br>ex)5004`,
      schema: {
        type: "string",
        example: "5004",
      },
    }),
    ApiQuery({
      name: DOMAIN,
      required: true,
      description: `domain<br>ex)ec2-18-144-147-89.us-west-1.compute.amazonaws.com`,
      schema: {
        type: "string",
        example: "ec2-18-144-147-89.us-west-1.compute.amazonaws.com",
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

export const scaleIn4DSS = () =>
  applyDecorators(
    ApiOperation({
      summary: `Scale In`,
      description: `4DLS가 4DSS Scale In 요청한다. <p><img src="/resources/img/api_doc/04_4DLS_scaleIn4DSS.png" /></p>`,
    }),
    ApiParam({
      name: SYSTEM_ID,
      required: true,
      description: `IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A`,
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiParam({
      name: NODE_ID,
      required: true,
      description: `node_id<br>ex)00000015`,
      schema: {
        type: "string",
        example: "00000015",
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
