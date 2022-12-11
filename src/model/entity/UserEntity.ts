import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './OrganizationEntity';
import { Role } from './RoleEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  desc: string;

  @Column({
    nullable: true, // 因为此属性后来才加，不设置nullable无法新增此属性
    length: 100,
    select: false,
  })
  password: string;

  @Column( { select: false } )
  email: string;

  @Column( { default: '' } )
  phone: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  nick: string;

  @Column({ default: 0 })
  status: number;

  @ManyToOne(type => Role, role => role.users)
  role: Role;

  @ManyToMany( type => Organization, orientation => orientation.users)
  organizations: Organization[];

  @Column({ default: 0 })
  isDelete: number;

  @Column({ default: false, comment: '是否完成身份验证' })
  verification: boolean;

  @Column({ default: '', nullable: true })
  crateTime: string;

  @Column({ default: '', nullable: true })
  updateTime: string;

  @Column({ default: '', nullable: true })
  deleteTime: string;
}
