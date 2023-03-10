import {
  IsNotEmpty,
  IsString,
  IsNumber, IsOptional,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateNodeDto {
  private  id: string;
  private name: string;
  private system_id: string;
  private public_ip: string;
  private public_port: number;
  private private_ip: string;
  private private_port: number;
  private node_type: string;
  private is_origin: string;
  private domain: string;
  private region: string;
  private region_name: string;
  private instance_id: string;
  private initial_state: string;
  private state: string;
  private is_auto_scale_out: string;
  private ls_type: string;
  private ml_tyle: string;
  private deploy_type: string;
  private parent_node_id: string;
}

export class UpdateNodeDto extends PartialType(CreateNodeDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PagingDto {
  pageNo: number = 1;
  PageSize: number = 9999;
  sortColumn: string = 'name';
  isDescending: boolean = false;
}