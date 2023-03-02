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
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

@Entity()
export class PdviewIndex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  systemId: string;

  @Column()
  pdviewIndex: string;
}
