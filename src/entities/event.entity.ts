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
export class Event {
  @PrimaryColumn()
  id: string;

  @Column()
  content_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  system_id: string;

  @Column()
  live_status: string;

  @Column()
  is_public: string;

  @Column()
  status: string;

  @Column()
  banner: string;

  @CreateDateColumn()
  scheduled_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  registered_at: Date;
}
