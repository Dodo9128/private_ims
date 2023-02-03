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
export class ApiExecuteTime {
  @PrimaryColumn({ unique: true, nullable: false })
  id: string;

  @Column({ unique: false, nullable: false })
  ip: string;

  @Column({ unique: false, nullable: false })
  api: string;

  @Column({ unique: false, nullable: true })
  execute_time: number;

  @Column({ unique: false, nullable: true })
  data: string;

  @CreateDateColumn({ unique: false, nullable: false })
  registered_at: Date;
}

// export class ApiExecuteTime {
//   @PrimaryColumn({ unique: true, nullable: false, length: 10 })
//   id: string;
//
//   @Column({ unique: false, nullable: false, length: 20 })
//   ip: string;
//
//   @Column({ unique: false, nullable: false, length: 200 })
//   api: string;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   execute_time: number;
//
//   @Column({ unique: false, nullable: true })
//   data: string;
//
//   @CreateDateColumn({ unique: false, nullable: false, length: 20 })
//   registered_at: Date;
// }
