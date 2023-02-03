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
export class WorldCountry {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "world Country ID", uniqueItems: true })
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "world Country Name" })
  name: string;

  @Column()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "world Country iso3" })
  iso3: string;

  @Column()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "world Country iso2" })
  iso2: string;

  @Column()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "world Country phonecode" })
  phonecode: string;

  @Column()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "world Country capital" })
  capital: string;

  @Column()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "world Country currency" })
  currency: string;

  @Column()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "world Country natives" })
  natives: string;

  @Column()
  @IsString()
  @ApiProperty({ description: "world Country flag" })
  flag: number;

  @Column()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "world Country wiki_data_id" })
  wiki_data_id: string;

  @Column()
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "world Country native" })
  native: string;

  @Column()
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, description: "world Country code" })
  code: number;
}
