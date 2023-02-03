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
export class Channel {
  @PrimaryColumn({ unique: true, nullable: false })
  id: string;

  @Column({ unique: false, nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  system_id: string;

  @Column({ unique: true, nullable: true })
  group_id: string;

  @Column({ unique: false, nullable: true })
  description: string;

  @Column({ unique: false, nullable: true })
  live_index: number;

  @Column({ unique: false, nullable: true })
  pdview_master_index: number;

  @Column({ unique: false, nullable: true })
  camera_ip: string;

  @Column({ unique: false, nullable: true })
  server_ip: string;

  @Column({ unique: false, nullable: true })
  server_port: number;

  @Column({ unique: false, nullable: true })
  media_type: string;

  @Column({ unique: false, nullable: true })
  gimbal_ip: string;

  @Column({ unique: false, nullable: true })
  is_gimbal_reset: string;

  @Column({ unique: false, nullable: true })
  status: string;

  @Column()
  audio: string;

  @CreateDateColumn({ unique: false, nullable: true })
  updated_at: Date;

  @CreateDateColumn({ unique: false, nullable: true })
  registered_at: Date;
}

//
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   ManyToOne,
//   OneToMany,
//   OneToOne,
//   JoinColumn,
//   PrimaryColumn,
// } from "typeorm";
// import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
//
// @Entity()
// export class Channel {
//   @PrimaryColumn({ unique: true, nullable: false, length: 100 })
//   id: string;
//
//   @Column({ unique: false, nullable: true, length: 255 })
//   name: string;
//
//   @Column({ unique: true, nullable: true, length: 100 })
//   system_id: string;
//
//   @Column({ unique: true, nullable: true, length: 100 })
//   group_id: string;
//
//   @Column({ unique: false, nullable: true })
//   description: string;
//
//   @Column({ unique: false, nullable: true, length: 10 })
//   live_index: number;
//
//   @Column({ unique: false, nullable: true, length: 10 })
//   pdview_master_index: number;
//
//   @Column({ unique: false, nullable: true, length: 39 })
//   camera_ip: string;
//
//   @Column({ unique: false, nullable: true, length: 39 })
//   server_ip: string;
//
//   @Column({ unique: false, nullable: true, length: 10 })
//   server_port: number;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   media_type: string;
//
//   @Column({ unique: false, nullable: true, length: 39 })
//   gimbal_ip: string;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   is_gimbal_reset: string;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   status: string;
//
//   @Column()
//   audio: string;
//
//   @CreateDateColumn({ unique: false, nullable: true, length: 6 })
//   updated_at: Date;
//
//   @CreateDateColumn({ unique: false, nullable: true, length: 6 })
//   registered_at: Date;
// }
