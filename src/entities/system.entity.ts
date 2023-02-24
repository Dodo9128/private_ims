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
export class System {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  venue_id: string;

  @Column('decimal', { precision: 20, scale: 15 }) //db 타입과 정밀도 등을 맞춰야 한다. 그렇지 않으면 정수만 입력된다.
  fps: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  is_extra: string;

  @Column()
  comment: string;

  @CreateDateColumn()
  subinfo_updated_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  registered_at: Date;
}
