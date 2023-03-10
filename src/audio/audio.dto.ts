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
export class CreateAudioDto {
  id: string;
  group_id: string;
  codec: string;
  channel_type: string;
  sample_rate: string;
  sample_bit: string;
  is_input: string;

}

export class UpdateAudioDto extends PartialType(CreateAudioDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}