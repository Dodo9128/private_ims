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
export class Scale {
  @PrimaryColumn()
  id: string;

  @Column()
  system_id: string;

  @Column()
  scale_group_count: number;

  @Column()
  scale_image_id: string;

  @Column()
  scale_instance_type: string;

  @Column()
  scale_instance_type2: string;

  @Column()
  scale_security_group_ids: string;

  @Column()
  scale_subnet_ids: string;

  @Column()
  scale_monitoring_tag_name: string;

  @Column()
  scale_monitoring_tag_value: string;

  @Column()
  scale_on: string;

  @Column()
  scale_out_resource: number;

  @Column()
  scale_in_resource: number;

  @Column()
  scale_out_limit_time: number;

  @Column()
  scale_ss_name: string;

  @Column()
  scale_key_name: string;

  @Column()
  region: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  registered_at: Date;
}
