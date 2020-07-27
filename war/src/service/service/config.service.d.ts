import { Repository } from 'typeorm';
import { Authority } from '../../model/entity/authority.entity';
import { Role } from '../../model/entity/role.entity';
import { User } from '../../model/entity/user.entity';
export declare class ConfigService {
    private readonly authorityRepository;
    private readonly roleRepository;
    private readonly userRepository;
    constructor(authorityRepository: Repository<Authority>, roleRepository: Repository<Role>, userRepository: Repository<User>);
    getUserAuth(id: string | number): Promise<{
        data: Role[];
        count: number;
    }>;
    getUserInfo(user: User): Promise<User>;
}
