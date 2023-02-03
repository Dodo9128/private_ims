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
export class WorldState {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "world State ID" })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world State Name" })
  @Column()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world State Name" })
  @Column()
  country_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world State country_code" })
  @Column()
  country_code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "world State fips_code" })
  @Column()
  fips_code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "world State iso2" })
  @Column()
  iso2: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world State flag" })
  @Column()
  flag: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "world State wiki_data_id" })
  @Column()
  wiki_data_id: string;
}
