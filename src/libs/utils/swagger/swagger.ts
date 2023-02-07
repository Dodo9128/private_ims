import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder, ApiProperty } from "@nestjs/swagger";

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle("IMS API DOCS")
    .setDescription("IMS API DOCS")
    .setVersion("4.5.0")
    .setTermsOfService("https://4dreplay.com")
    .setContact("", "", "pfsupport@4dreplay.com")
    .setLicense("Apache 2.0", "http://www.apache.org/licenses/LICENSE-2.0.html")
    .setBasePath("/")
    // .setSchemePath(["http", "https"])
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);
}

// export class BaseApiResponse<T> {
//   public data: T; // Swagger Decorator is added in the extended class below, since that will override this one.
//
//   // @ApiProperty({ type: Object })
//   // public meta: any;
// }
//
// export function SwaggerBaseApiResponse<T>(type: T): typeof BaseApiResponse {
//   class ExtendedBaseApiResponse<T> extends BaseApiResponse<T> {
//     @ApiProperty({ type })
//     public data: T;
//   }
//   // NOTE : Overwrite the returned class name, otherwise whichever type calls this function in the last,
//   // will overwrite all previous definitions. i.e., Swagger will have all response types as the same one.
//   const isAnArray = Array.isArray(type) ? " [ ] " : "";
//   Object.defineProperty(ExtendedBaseApiResponse, "name", {
//     value: `SwaggerBaseApiResponseFor ${type} ${isAnArray}`,
//   });
//
//
//   return ExtendedBaseApiResponse;
// }
