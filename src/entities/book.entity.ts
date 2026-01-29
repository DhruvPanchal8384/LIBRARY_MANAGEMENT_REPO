import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn} from "typeorm";

//================== Book Entity ====================
@Entity("books_table")
export class Book{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", nullable: true})
    title!: string;

    @Column({type: "varchar", nullable:true})
    author!: string;

    @Column({type: "varchar", nullable: true})
    isbn!: string;

    @Column({type: "int", nullable: true})
    quantity!: number;

    @Column({type:"int", nullable: true})
    available!: number;

    @CreateDateColumn({ type: 'timestamp', nullable: true})
    created_at!: Date;
}