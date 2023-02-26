import {
  IsNotEmpty,
  IsString,
  IsNumber, IsOptional,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import {CreateVenueDto} from "../venue/venue.dto";

export class CreateRuleDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  system_id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  node_type: string;

  @IsNumber()
  session: number;

  @IsNumber()
  max_instances: number;

  @IsString()
  region: string;
}
export class UpdateRuleDto extends PartialType(CreateRuleDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}