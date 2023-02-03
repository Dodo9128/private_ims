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
export class CodeCommon {
  // @PrimaryColumn({ unique: false, nullable: true, length: 20 })
  @PrimaryColumn({})
  group_code: string;

  // @PrimaryColumn({ unique: false, nullable: true,})
  @PrimaryColumn({})
  code: string;

  @Column({ unique: false, nullable: true })
  description: string;

  @Column({ unique: false, nullable: true })
  is_use: string;

  @Column({ unique: false, nullable: true })
  name: string;

  @Column({ unique: false, nullable: true })
  order_seq: number;
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
// export class CodeCommon {
//   // @PrimaryColumn({ unique: false, nullable: true, length: 20 })
//   @PrimaryColumn({ length: 20 })
//   group_code: string;
//
//   // @PrimaryColumn({ unique: false, nullable: true, length: 20 })
//   @PrimaryColumn({ length: 20 })
//   code: string;
//
//   @Column({ unique: false, nullable: true, length: 200 })
//   description: string;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   is_use: string;
//
//   @Column({ unique: false, nullable: true, length: 20 })
//   name: string;
//
//   @Column({ unique: false, nullable: true, length: 11 })
//   order_seq: number;
// }
