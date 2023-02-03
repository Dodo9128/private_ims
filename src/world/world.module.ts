import { Module } from "@nestjs/common";
import { WorldService } from "./world.service";
import { WorldController } from "./world.controller";
import { WorldCountryRepository, WorldStateRepository, WorldCityRepository } from "./world.repository";

@Module({
  controllers: [WorldController],
  providers: [WorldService, WorldCountryRepository, WorldStateRepository, WorldCityRepository],
})
export class WorldModule {}
