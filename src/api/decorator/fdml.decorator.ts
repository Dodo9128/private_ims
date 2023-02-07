import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import {
  DOMAIN,
  EVENT_ID,
  INITIAL_STATE,
  INSTANCE_ID,
  NODE_ID,
  PRIVATE_IP,
  PRIVATE_PORT,
  PUBLIC_IP,
  PUBLIC_PORT,
  REGION,
  RS_ID,
  SYSTEM_ID,
} from "../../global/constant";

// TODO: API decorator swagger return params create / add

export const nodeIp44DML = () =>
  applyDecorators(
    ApiOperation({
      summary: `본인 노드 정보 조회`,
      description: `4DML에서 시스템 설정하기 위해 자기 자신의 node 정보들을 조회한다.`,
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
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

export const getSystemFor4DML = () =>
  applyDecorators(
    ApiOperation({
      summary: `시스템 설정 조회`,
      description: `4DML에서 시스템 설정하기 위한 정보들을 조회한다.`,
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
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

export const get4DML = () =>
  applyDecorators(
    ApiOperation({
      summary: `4DML 설정 조회`,
      description: `4DMLM에서 시스템 설정하기 위한 4DML 정보들을 조회한다.`,
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
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

export const getScale44DML = () =>
  applyDecorators(
    ApiOperation({
      summary: `Scale 정보 조회`,
      description: `IMS에서 설정한 Scale out 정보를 조회한다.`,
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
      required: true,
      description: `<p><strong>[4DLS > IMS]</strong></p>\nIMS에서 전달된 초기 시스템 ID 값<br>ex)0001A`,
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

export const scaleOut4DML = () =>
  applyDecorators(
    ApiOperation({
      summary: `Scale Out`,
      description: `4DMLM이 4DML Scale Out 요청한다.`,
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
      required: true,
      description: `IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A`,
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiQuery({
      name: `${INSTANCE_ID}`,
      required: true,
      description: `instance_id<br>ex)i-0950f5a279a64a4fd`,
      schema: {
        type: "string",
        example: "i-0950f5a279a64a4fd",
      },
    }),
    ApiQuery({
      name: `${PRIVATE_IP}`,
      required: true,
      description: `private_ip<br>ex)175.116.17.219`,
      schema: {
        type: "string",
        example: "175.116.17.219",
      },
    }),
    ApiQuery({
      name: `${PRIVATE_PORT}`,
      required: true,
      description: `private_port<br>ex)8553`,
      schema: {
        type: "string",
        example: "8553",
      },
    }),
    ApiQuery({
      name: `${INITIAL_STATE}`,
      required: true,
      description: `initial_state<br>ex)temporary`,
      schema: {
        type: "string",
        example: "temporary",
      },
    }),
    ApiQuery({
      name: `${REGION}`,
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

export const scaleOut4DMLOk = () =>
  applyDecorators(
    ApiOperation({
      summary: `Scale Out OK`,
      description: `Scale Out이 정상적으로 running일 경우, IP, PORT, domain 정보 업데이트 한다.`,
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
      required: true,
      description: `IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A`,
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiParam({
      name: `${NODE_ID}`,
      required: true,
      description: `node_id<br>ex)00000015`,
      schema: {
        type: "string",
        example: "00000015",
      },
    }),
    ApiParam({
      name: `${RS_ID}`,
      required: true,
      description: `rs_id<br>ex)00000015`,
      schema: {
        type: "string",
        example: "00000015",
      },
    }),
    ApiQuery({
      name: `${PUBLIC_IP}`,
      required: true,
      description: `public_ip<br>ex)169.254.13.122`,
      schema: {
        type: "string",
        example: "169.254.13.122",
      },
    }),
    ApiQuery({
      name: `${PUBLIC_PORT}`,
      required: true,
      description: `public_port<br>ex)5004`,
      schema: {
        type: "string",
        example: "5004",
      },
    }),
    ApiQuery({
      name: `${DOMAIN}`,
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

export const scaleIn4DML = () =>
  applyDecorators(
    ApiOperation({
      summary: `Scale In`,
      description: `4DMLM이 4DML Scale In 요청한다.`,
    }),
    ApiParam({
      name: `${SYSTEM_ID}`,
      required: true,
      description: `IMS에서 전달된 초기 시스템 ID 값<br>ex)0001A`,
      schema: {
        type: "string",
        example: "0001A",
      },
    }),
    ApiParam({
      name: `${NODE_ID}`,
      required: true,
      description: `node_id<br>ex)00000015`,
      schema: {
        type: "string",
        example: "00000015",
      },
    }),
    ApiParam({
      name: `${RS_ID}`,
      required: true,
      description: `rs_id<br>ex)00000015`,
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

export const getCFurl = () =>
  applyDecorators(
    ApiOperation({
      summary: `Media Store의 CloudFront 주소 조회`,
      description: `Prewarming에 사용하기 위한 Media Store의 CloudFront prefix 주소를 반환한다.`,
    }),
    ApiParam({
      name: `${EVENT_ID}`,
      required: true,
      description: `4DML-M에서 전달된 초기 이벤트 ID 값<br>ex)0001A0001`,
      schema: {
        type: "string",
        example: "0001A0001",
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
