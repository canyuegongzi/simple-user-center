import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Authority } from './AuthorityEntity';
import { User } from './UserEntity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text', { nullable: true })
  desc: string;

  @Column()
  code: string;

  @ManyToMany(type => Authority, authority => authority.roles)
  @JoinTable()
  authority: Authority[];

  @OneToMany(type => User, user => user.role)
  users: User[];

  @Column({ default: 0 })
  isDelete: number;

  @Column({ default: '', nullable: true })
  crateTime: string;

  @Column({ default: '', nullable: true })
  updateTime: string;

  @Column({ default: '', nullable: true })
  deleteTime: string;
}
