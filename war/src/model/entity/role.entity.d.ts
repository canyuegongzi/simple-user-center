import { Authority } from './authority.entity';
import { User } from './user.entity';
export declare class Role {
    id: number;
    name: string;
    desc: string;
    code: string;
    authority: Authority[];
    users: User[];
    isDelete: number;
    crateTime: string;
    updateTime: string;
    deleteTime: string;
}
