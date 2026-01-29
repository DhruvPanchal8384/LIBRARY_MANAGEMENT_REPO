import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

// ================== Member Entity ====================
@Entity("member_table")
export class Member{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", nullable: true})
    name!: string;

    @Column({type: "varchar", nullable: true})
    email!: string;

    @Column({type: "varchar", nullable: true})
    phone!: string;

    @CreateDateColumn({type: 'timestamp', nullable: true})
    created_at!: Date;

}