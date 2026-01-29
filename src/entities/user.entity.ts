import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//================== User Entity ====================
@Entity("user_table")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: true })
  name!: string;

  @Column({ type: "varchar", nullable: true })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  password!: string;

  @Column({ type: "varchar", nullable: true, default: "ADMIN" })
  role!: string;
}
