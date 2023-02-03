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
export class CodeGroup {
  @PrimaryColumn()
  code: string;

  @Column()
  description: string;

  @Column()
  is_use: string;

  @Column()
  name: string;

  @Column()
  order_seq: number;
}
