import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './RoleEntity';

@Entity()
export class Authority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text', { nullable: true })
  desc: string;

  @Column()
  path: string;

  @Column()
  value: string;

  @Column()
  parentId: number;

  @Column({ default: '', nullable: true })
  parentName: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: false })
  system: string;

  @Column()
  code: string;

  @ManyToMany(type => Role, role => role.authority)
  roles: Role[];

  @Column({ default: 0 })
  isDelete: number;

  @Column({ default: '', nullable: true })
  crateTime: string;

  @Column({ default: '', nullable: true })
  updateTime: string;

  @Column({ default: '', nullable: true })
  deleteTime: string;
}
