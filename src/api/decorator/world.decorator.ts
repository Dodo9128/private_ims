import { applyDecorators, Get, Post } from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiOperation, ApiBody, ApiParam, ApiQuery } from "@nestjs/swagger";
import {
  worldCitySuccessReturn,
  worldCountrySuccessReturn,
  worldFailReturn,
  worldStateSuccessReturn,
} from "../../libs/utils/swagger/swaggerResultProperties/worldResultProperties.swagger";
import {
  listWorldCitySuccessReturn,
  listWorldCountrySuccessReturn,
  listWorldStateSuccessReturn,
} from "../../libs/utils/swagger/swaggerResultProperties/worldResult.dto";

export const listWorldCountry = () =>
  applyDecorators(
    // Post("listWorldCountry"),
    ApiOperation({ summary: "국가목록조회", description: "전세계 국가 코드 조회 합니다." }),
    ApiQuery({
      name: "pageNo",
      required: false,
      description: "페이지번호",
      schema: {
        type: "number",
        default: 1,
      },
    }),
    ApiQuery({
      name: "pageSize",
      required: false,
      description: "목록개수",
      schema: {
        type: "number",
        default: 9999,
      },
    }),
    ApiQuery({
      name: "sortColumn",
      required: false,
      description: "정렬컬럼",
      schema: {
        type: "string",
        default: "name",
      },
    }),
    ApiQuery({
      name: "isDecending",
      required: false,
      description: "내림차순여부",
      schema: {
        type: "boolean",
        default: false,
      },
    }),
    ApiOkResponse({
      description: "OK !!",
      type: listWorldCountrySuccessReturn,
      // schema: {
      //   // type: "object",
      //   // properties: worldCountrySuccessReturn,
      // },
    }),
    ApiResponse({
      status: 400,
      description: "BAD REQUEST !!",
      // type: worldCountryFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
    ApiResponse({
      status: 404,
      description: "NOT FOUND !!",
      // type: worldFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
    ApiResponse({
      status: 500,
      description: "INTERNAL SERVER ERROR !!",
      // type: worldFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
  );

export const listWorldState = () =>
  applyDecorators(
    // Post("listWorldState"),
    ApiOperation({ summary: "주목록조회", description: "특정 국가의 주 코드 조회 합니다." }),
    ApiQuery({
      name: "countryId",
      required: false,
      description: "국가ID",
      type: "number",
    }),
    ApiQuery({
      name: "pageNo",
      required: false,
      description: "페이지번호",
      schema: {
        type: "number",
        default: 1,
      },
    }),
    ApiQuery({
      name: "pageSize",
      required: false,
      description: "목록개수",
      schema: {
        type: "number",
        default: 9999,
      },
    }),
    ApiQuery({
      name: "sortColumn",
      required: false,
      description: "정렬컬럼",
      schema: {
        type: "string",
        default: "name",
      },
    }),
    ApiQuery({
      name: "isDecending",
      required: false,
      description: "내림차순여부",
      schema: {
        type: "boolean",
        default: false,
      },
    }),
    ApiOkResponse({
      description: "OK !!",
      type: listWorldStateSuccessReturn,

      // schema: {
      //   type: "object",
      //   properties: worldStateSuccessReturn,
      // },
    }),
    ApiResponse({
      status: 400,
      description: "BAD REQUEST !!",
      // type: worldFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
    ApiResponse({
      status: 404,
      description: "NOT FOUND !!",
      // type: worldFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
    ApiResponse({
      status: 500,
      description: "INTERNAL SERVER ERROR !!",
      // type: worldFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
  );

export const listWorldCity = () =>
  applyDecorators(
    // Post("listWorldCity"),
    ApiOperation({ summary: "도시목록조회", description: "특정 국가, 특정 주의 도시 코드 조회 합니다." }),
    ApiQuery({
      name: "countryId",
      required: false,
      type: "number",
      description: "국가ID",
    }),
    ApiQuery({
      name: "stateId",
      required: false,
      type: "number",
      description: "주ID",
    }),
    ApiQuery({
      name: "pageNo",
      required: false,
      description: "페이지번호",
      schema: {
        type: "number",
        default: 1,
      },
    }),
    ApiQuery({
      name: "pageSize",
      required: false,
      description: "목록개수",
      schema: {
        type: "number",
        default: 9999,
      },
    }),
    ApiQuery({
      name: "sortColumn",
      required: false,
      description: "정렬컬럼",
      schema: {
        type: "string",
        default: "name",
      },
    }),
    ApiQuery({
      name: "isDecending",
      required: false,
      description: "내림차순여부",
      schema: {
        type: "boolean",
        default: false,
      },
    }),
    ApiOkResponse({
      description: "OK !!",
      type: listWorldCitySuccessReturn,
      // schema: {
      //   type: "object",
      //   properties: worldCitySuccessReturn,
      // },
    }),
    ApiResponse({
      status: 400,
      description: "BAD REQUEST !!",
      // type: worldFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
    ApiResponse({
      status: 404,
      description: "NOT FOUND !!",
      // type: worldFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
    ApiResponse({
      status: 500,
      description: "INTERNAL SERVER ERROR !!",
      // type: worldFailReturn,
      schema: {
        type: "object",
        properties: worldFailReturn,
      },
    }),
  );
