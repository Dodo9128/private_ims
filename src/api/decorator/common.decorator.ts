import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";

// TODO: API decorator swagger return params create / add

export const getHealthCheck = () =>
  applyDecorators(
    ApiOperation({
      summary: `health check point`,
      description: `AWS ELB이용시 또는 다른 서비스를 통해 서버 health check 진행시 200을 return 합니다.`,
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
