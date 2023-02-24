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
export class CreateChannelDto {
  id: string;
  name: string;
  system_id: string;
  group_id: string;
  description: string;
  live_index: number;
  pdview_master_index: number;
  camera_ip: string;
  server_ip: string;
  server_port: number;
  media_type: string;
  gimbal_ip: string;
  is_gimbal_reset: string;
  status: string;
  audio: string;
}

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}