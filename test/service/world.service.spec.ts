import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../src/app.module";

process.env.NODE_ENV = "test";

let app: INestApplication;

describe("WorldServiceTest", () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  // listWorldCountry Test
  it("service_listWorldCountry", async () => {
    const testPageNo = 1;
    const testSortColumn = "id";
    const testIsDecending = true;
    const response = await request(app.getHttpServer())
      .post(
        `/worldCountry/listWorldCountry/?pageNo=${testPageNo}&sortColumn=${testSortColumn}&isDecending=${testIsDecending}`,
      )
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual("OK");
    expect(response.body.message).toEqual("SUCCESS");
    expect(response.body.data).not.toEqual(null);
    expect(Number(response.body.data.totalCount)).toEqual(Number(response.body.data.listCount));
  });

  // listWorldState Test
  it("service_listWorldState", async () => {
    const testPageNo = 1;
    const testSortColumn = "id";
    const testIsDecending = true;
    const response = await request(app.getHttpServer())
      .post(
        `/worldCountry/listWorldState/?pageNo=${testPageNo}&sortColumn=${testSortColumn}&isDecending=${testIsDecending}`,
      )
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual("OK");
    expect(response.body.message).toEqual("SUCCESS");
    expect(response.body.data).not.toEqual(null);
    expect(Number(response.body.data.totalCount)).toEqual(Number(response.body.data.listCount));
  });

  // listWorldCity Test
  it("service_listWorldCity", async () => {
    const testPageNo = 1;
    const testSortColumn = "id";
    const testIsDecending = true;
    const response = await request(app.getHttpServer())
      .post(
        `/worldCountry/listWorldCity/?pageNo=${testPageNo}&sortColumn=${testSortColumn}&isDecending=${testIsDecending}`,
      )
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual("OK");
    expect(response.body.message).toEqual("SUCCESS");
    expect(response.body.data).not.toEqual(null);
    expect(Number(response.body.data.totalCount)).toEqual(Number(response.body.data.listCount));
  });
});
