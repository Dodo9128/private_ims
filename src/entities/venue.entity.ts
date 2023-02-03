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
export class Venue {
  @PrimaryColumn()
  id: string;

  @Column()
  country_id: number;

  @Column()
  state_id: number;

  @Column()
  city_id: number;

  @Column()
  event_name: string;

  @Column()
  event_code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  timezone_name: string;

  @Column()
  timezone_offset: string;

  @Column()
  comment: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  registered_at: Date;
}
