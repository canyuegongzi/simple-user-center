import { User } from './user.entity';
export declare class Organization {
    id: number;
    name: string;
    desc: string;
    parentId: number;
    parentName: string;
    leader: User;
    users: User[];
    isDelete: number;
    crateTime: string;
    updateTime: string;
    deleteTime: string;
}
