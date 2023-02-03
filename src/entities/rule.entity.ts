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
export class Rule {
  @PrimaryColumn()
  id: string;

  @Column()
  system_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  node_type: string;

  @Column()
  session: number;

  @Column()
  max_instances: number;

  @Column()
  region: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  registered_at: Date;
}
