import {
  IsNotEmpty,
  IsString,
  IsNumber, IsOptional,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  id: string;
  content_id: number;
  name: string;
  description: string;
  system_id: string;
  scheduled_at: string;
  live_status: string;
  is_public: string;
  status: string;
  banner: string;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}