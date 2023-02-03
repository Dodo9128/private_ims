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
export class AdaptiveStreaming {
  @PrimaryColumn({ unique: true, nullable: false })
  id: string;

  @Column({ unique: true, nullable: false })
  group_id: string;

  @Column({ unique: false, nullable: true })
  codec: string;

  @Column({ unique: false, nullable: true })
  width: number;

  @Column({ unique: false, nullable: true })
  height: number;

  @Column({ unique: false, nullable: true })
  bitrate: number;

  @Column({ unique: false, nullable: true })
  gop: number;

  @Column({ unique: false, nullable: true })
  fps: number;

  @Column({ unique: false, nullable: true })
  is_input: string;
}

// export class AdaptiveStreaming {
//   @PrimaryColumn({ unique: true, nullable: false, length: 100 })
//   id: string;
//
//   @Column({ unique: true, nullable: false, length: 100 })
//   group_id: string;
//
//   @Column({ unique: false, nullable: true, length: 255 })
//   codec: string;
//
//   @Column({ unique: false, nullable: true, length: 10 })
//   width: number;
//
//   @Column({ unique: false, nullable: true, length: 10 })
//   height: number;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   bitrate: number;
//
//   @Column({ unique: false, nullable: true, length: 10 })
//   gop: number;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   fps: number;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   is_input: string;
// }
