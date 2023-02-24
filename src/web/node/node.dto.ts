import {
  IsNotEmpty,
  IsString,
  IsNumber, IsOptional,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNodeDto {
  id: string;
  name: string;
  system_id: string;
  public_ip: string;
  public_port: number;
  private_ip: string;
  private_port: number;
  node_type: string;
  is_origin: string;
  domain: string;
  region: string;
  region_name: string;
  instance_id: string;
  initial_state: string;
  state: string;
  is_auto_scale_out: string;
  ls_type: string;
  ml_tyle: string;
  deploy_type: string;
  parent_node_id: string;
}

export class UpdateNodeDto extends PartialType(CreateNodeDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}