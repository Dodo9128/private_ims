import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomTypeOrmModule } from "../database/typeorm.module"
import { VenueRepository } from "./venue.repository";
import { WebVenueController } from "../web/web.venue.controller";
import { VenueService } from "./venue.service";
import { Venue } from "../entities/venue.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature([Venue]),
    CustomTypeOrmModule.forCustomRepository([VenueRepository]),
  ],
  controllers: [WebVenueController],
  providers: [VenueService],
})
export class VenueModule {}