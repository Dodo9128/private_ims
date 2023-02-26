import {
  IsNotEmpty,
  IsString,
  IsNumber, IsDecimal,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @description
 *
 */
export class CreateSystemDto {
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  venue_id: string;

  @IsDecimal()
  fps: any;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsString()
  is_extra: string;

  @IsString()
  comment: string;
}

export class UpdateSystemDto extends PartialType(CreateSystemDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}