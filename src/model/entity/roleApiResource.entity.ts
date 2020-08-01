import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'role_api_resource'})
export class RoleApiResourceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: '角色id', nullable: false })
    roleId: number;

    @Column({nullable: true, comment: '资源id'})
    apiResourceId: number;
}
