import { Repository } from 'typeorm';
import { System } from '../../model/entity/system.entity';
import { CreateSystemDto } from '../../model/DTO/system/create_system.dto';
import { UpdateSystemDto } from '../../model/DTO/system/update_system.dto';
import { QuerySystemDto } from '../../model/DTO/system/system_role.dto';
export declare class SystemService {
    private readonly systemRepository;
    constructor(systemRepository: Repository<System>);
    creatSystem(system: CreateSystemDto): Promise<System>;
    updateSystem(system: UpdateSystemDto): Promise<import("typeorm").UpdateResult>;
    deleteSystem(ids: Array<number | string>): Promise<import("typeorm").UpdateResult>;
    getSystemInfo(query: string): Promise<System>;
    checkValue(query: string): Promise<System>;
    getList(query: QuerySystemDto): Promise<{
        data: System[];
        count: number;
    }>;
    getAllList(): Promise<System[]>;
}
