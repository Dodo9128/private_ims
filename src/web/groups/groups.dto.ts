import {
  IsNotEmpty,
  IsString,
  IsNumber, IsOptional
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupsDto {
  @IsOptional()
  id: string;
  name: string;
  system_id: string;
  description: string;
  type: string;
  is_external_group: string;
  is_replay: string;
  is_dbview: string;
  is_interactive: string;
  is_timemachine: string;
  default_channel_index: number;
  default_audio_index: number;
  is_default_group: string;
  group_index: number;
  view_type: string;

  @IsOptional()
  updated_at: Date;
}

export class UpdateGroupsDto extends PartialType(CreateGroupsDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}