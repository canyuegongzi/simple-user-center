import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class System {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column('text', {nullable: true})
    desc: string;

    @Column()
    value: string;

    @Column({default: 0})
    isDelete: number;

    @Column({default: '', nullable: true })
    crateTime: string;

    @Column({default: '', nullable: true })
    updateTime: string;

    @Column({default: '', nullable: true })
    deleteTime: string;
}
