import { Organization } from './organization.entity';
import { Role } from './role.entity';
export declare class User {
    id: number;
    name: string;
    desc: string;
    password: string;
    email: string;
    phone: string;
    age: string;
    address: string;
    nick: string;
    status: number;
    role: Role;
    organizations: Organization[];
    isDelete: number;
    verification: boolean;
    crateTime: string;
    updateTime: string;
    deleteTime: string;
}
