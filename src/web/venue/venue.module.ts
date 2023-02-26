import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomTypeOrmModule } from "../../database/typeorm.module"
import { VenueRepository } from "../../repository/venue.repository";
import { VenueController } from "./venue.controller";
import { VenueService } from "./venue.service";
// import { ConnectionService } from "../../database/connection.service";
import { Venue } from "../../entities/venue.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([Venue]),
    CustomTypeOrmModule.forCustomRepository([VenueRepository]),
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}