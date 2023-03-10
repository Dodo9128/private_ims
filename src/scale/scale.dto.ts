import {
  IsNotEmpty,
  IsString,
  IsNumber, IsOptional,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateScaleDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  system_id: string;
  scale_group_count: number;
  scale_image_id: string;
  scale_instance_type: string;
  scale_instance_type2: string;
  scale_security_group_ids: string;
  scale_subnet_ids: string;
  scale_monitoring_tag_name: string;
  scale_monitoring_tag_value: string;
  scale_on: string;
  scale_out_resource: number;
  scale_in_resource: number;
  scale_out_limit_time: number;
  scale_ss_name: string;
  scale_key_name: string;
  region: string;
}
export class UpdateScaleDto extends PartialType(CreateScaleDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}