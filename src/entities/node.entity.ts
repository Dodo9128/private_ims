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
export class Node {
  @PrimaryColumn()
  id: string;

  @Column()
  system_id: string;

  @Column()
  public_ip: string;

  @Column()
  public_port: number;

  @Column()
  private_ip: string;

  @Column()
  private_port: number;

  @Column()
  node_type: string;

  @Column()
  is_origin: string;

  @Column()
  domain: string;

  @Column()
  region: string;

  @Column()
  region_name: string;

  @Column()
  instance_id: string;

  @Column()
  initial_state: string;

  @Column()
  state: string;

  @Column()
  is_auto_scale_out: string;

  @Column()
  is_type: string;

  @Column()
  ml_type: string;

  @Column()
  deploy_type: string;

  @Column()
  parent_node_id: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  registered_at: Date;
}
