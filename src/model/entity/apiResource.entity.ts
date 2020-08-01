import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'api_resource'})
export class ApiResource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column('text', {nullable: true})
    desc: string;

    @Column()
    value: string;

    @Column({comment: '1: 系统， 2： 模块， 3： 接口'})
    type: number;

    @Column()
    parentId: number;

    @Column({default: '', nullable: true })
    parentName: string;

    @Column({nullable: false})
    system: string;

    @Column({nullable: false})
    module: string;

    @Column()
    code: string;

    @Column({default: 0})
    isDelete: number;

    @Column({default: '', nullable: true })
    crateTime: string;

    @Column({default: '', nullable: true })
    updateTime: string;

    @Column({default: '', nullable: true })
    deleteTime: string;
}
