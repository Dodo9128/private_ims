import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class WorldCity {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "world City ID" })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world City Name" })
  @Column()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "world City state_id" })
  @Column()
  state_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world City state_code" })
  @Column()
  state_code: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "world City country_id" })
  @Column()
  country_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world City country_code" })
  @Column()
  country_code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world City latitude" })
  @Column()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world City longitude" })
  @Column()
  longitude: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world City flag" })
  @Column()
  flag: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "world City wiki_data_id" })
  @Column()
  wiki_data_id: string;
}
