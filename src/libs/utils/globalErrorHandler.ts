import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { currentTimeMaker, sendFail } from "./functionReturn";
import { LoggerService } from "../../../config/winstonConfiguration";
import { IncomingWebhook } from "ms-teams-webhook";
import * as ip from "ip";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly webHook: IncomingWebhook) {}

  logger = new LoggerService("globalException");
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionObj = exception.getResponse();

    let serviceName;
    let serviceFunc;
    let errorObj;
    const timestamp = currentTimeMaker();

    // global endpoint exception filter
    if (exceptionObj["statusCode"] === 404) {
      serviceName = `${exceptionObj["error"]}`;
      serviceFunc = request.url;
      errorObj = { message: exceptionObj["message"] };
    }
    // class-validator 를 위한 error format
    else if (exceptionObj["statusCode"] === 400) {
      serviceName = `Validation Error : ${exceptionObj["error"]}`;
      serviceFunc = request.url;
      // 2개 이상의 validation 체크 시 우선되는 1개의 에러만 return 하기 위함
      errorObj = { message: exceptionObj["message"][0] };
    } else {
      serviceName = exceptionObj["service"];
      serviceFunc = exceptionObj["name"];
      errorObj = exceptionObj["error"];
    }

    const myIp = ip.address();

    await this.webHook.send({
      "@type": "MessageCard",
      "@context": "https://schema.org/extensions",
      summary: "Notice Error To PF-Backend Teams Channel",
      themeColor: "#D30000",
      title: `!!! ERROR !!!`,
      sections: [
        {
          activityTitle: `${process.env.HOSTNAME} (${myIp})`,
          activitySubtitle: timestamp,
          // activityImage: `https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-error-icon-image_1127796.jpg`,
          activityImage: `https://png.pngtree.com/png-vector/20220831/ourlarge/pngtree-error-failed-png-image_6130189.png`,
          facts: [
            {
              name: "Service",
              value: `${exceptionObj["service"]}`,
            },
            {
              name: "Func",
              value: `${exceptionObj["name"]}`,
            },
            {
              name: "Error Message",
              value: `${errorObj["message"]}`,
            },
          ],
          markdown: true,
        },
      ],
    });

    this.logger.httpException(serviceName, serviceFunc, errorObj, status, timestamp);

    // seperate to global endpoint exception
    if (status !== 404 && request.url !== "/favicon.ico") {
      response
        .status(status)
        // .json({
        //   statusCode: status,
        //   timestamp: new Date().toISOString(),
        //   path: request.url,
        // });
        .json(sendFail(errorObj.message, null));
    } else {
      response.status(HttpStatus.NOT_FOUND).json(sendFail(errorObj.message, null));
      // global endpoint exception redirect to home
      // .redirect(308, `${process.env.MY_ADDRESS}:${process.env.SERVER_PORT}`);
    }
  }
}

export function makeErrorInfoObjForHttpException(service: string, name: string, errorObj: object) {
  return {
    service: service,
    name: name,
    error: errorObj,
  };
}
