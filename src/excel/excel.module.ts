import { Module } from "@nestjs/common";
import { ExcelController } from "./excel.controller";
import { ExcelService } from "./excel.service";
import { ExcelRepository } from "./excel.repository";

@Module({
  imports: [],
  controllers: [ExcelController],
  providers: [ExcelService, ExcelRepository],
})
export class ExcelModule {}
