import { Role } from './role.entity';
export declare class Authority {
    id: number;
    name: string;
    desc: string;
    path: string;
    value: string;
    parentId: number;
    parentName: string;
    icon: string;
    system: string;
    code: string;
    roles: Role[];
    isDelete: number;
    crateTime: string;
    updateTime: string;
    deleteTime: string;
}
