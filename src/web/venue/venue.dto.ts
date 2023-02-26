import {
  IsNotEmpty,
  IsString,
  IsNumber, IsOptional,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @description
 *
 */
export class CreateVenueDto {
  @IsNumber()
  @IsNotEmpty()
  country_id: number;

  @IsOptional()
  @IsNumber()
  state_id: number;

  @IsOptional()
  @IsNumber()
  city_id: number;

  @IsString()
  event_name: string;

  @IsOptional()
  @IsString()
  event_yymm: string;

  @IsString()
  event_code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsString()
  @IsOptional()
  timezone_name: string;

  @IsString()
  @IsOptional()
  timezone_offset: string;
}

export class UpdateVenueDto extends PartialType(CreateVenueDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}