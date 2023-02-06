import { Module } from "@nestjs/common";
import { FdpdController } from "./controller/fdpd.controller";

@Module({
  // TODO: import other modules what need
  // imports: [ChannelModule, SystemModule, VenueModule, EventModule],
  imports: [],
  controllers: [FdpdController],
})
export class ApiModule {}
