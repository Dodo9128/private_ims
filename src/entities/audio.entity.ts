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
export class Audio {
  @PrimaryColumn({ unique: true, nullable: false, length: 100 })
  id: string;

  @Column({ unique: true, nullable: false, length: 100 })
  group_id: string;

  @Column({ unique: false, nullable: true, length: 255 })
  codec: string;

  @Column({ unique: false, nullable: true, length: 20 })
  channel_type: string;

  @Column({ unique: false, nullable: true, length: 255 })
  sample_rate: string;

  @Column({ unique: false, nullable: true, length: 255 })
  sample_bit: string;

  @Column({ unique: false, nullable: true, length: 20 })
  is_input: string;
}
