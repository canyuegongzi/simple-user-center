import { User } from '../../entity/user.entity';
export declare class CreateOrganizationDto {
    name: string;
    desc: string;
    parentId: any;
    leaderId: any;
    users: User[];
}
