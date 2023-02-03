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
export class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  group_id: string;

  @Column()
  codec: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  bitrate: number;

  @Column()
  gop: number;

  @Column()
  fps: number;

  @Column()
  is_input: string;
}
