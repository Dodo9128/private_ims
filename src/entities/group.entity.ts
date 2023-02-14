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
export class Groups {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  system_id: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  is_external_group: string;

  @Column()
  is_replay: string;

  @Column()
  is_pdview: string;

  @Column()
  is_interactive: string;

  @Column()
  is_timemachine: string;

  @Column()
  default_channel_index: number;

  @Column()
  default_audio_index: number;

  @Column()
  is_default_group: string;

  @Column()
  group_index: number;

  @Column()
  view_type: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  registered_at: Date;
}
