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
export class CreateVideoDto {
  id: string;
  group_id: string;
  codec: string;
  width: number;
  height: number;
  bitrate: number;
  gop: number;
  fps: number;
  is_input: string;

}

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}