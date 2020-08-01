import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import {Role} from './role.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, default: '' })
  name: string;

  @Column({default: '', nullable: true })
  desc: string;

  @Column()
  parentId: number;

  @Column({default: '', nullable: true })
  parentName: string;

  @ManyToOne(type => User, user => user.id)
  leader: User;

  @ManyToMany(type => User, user => user.organizations)
  @JoinTable()
  users: User[];

  @Column({default: 0})
  isDelete: number;

  @Column({default: '', nullable: true })
  crateTime: string;

  @Column({default: '', nullable: true })
  updateTime: string;

  @Column({default: '', nullable: true })
  deleteTime: string;
}
