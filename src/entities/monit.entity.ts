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
export class Monit {
  @PrimaryColumn()
  id: string;

  @Column()
  system_id: string;

  @Column()
  node_type: string;

  @Column()
  region: string;

  @Column()
  node_id: string;

  @Column()
  node_name: string;

  @Column()
  private_ip: string;

  @Column()
  private_port: number;

  @Column()
  action: string;

  @Column()
  status: string;

  @Column()
  message: string;

  @CreateDateColumn()
  registered_at: Date;
}
