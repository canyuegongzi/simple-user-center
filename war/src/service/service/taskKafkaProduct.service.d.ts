import { KafkaService } from '../../common/kafka/kafka.service';
import { KafkaTaskDto } from '../../model/DTO/kafka/KafkaTaskDto';
export declare class TaskKafkaProductService {
    private readonly kafkaService;
    constructor(kafkaService: KafkaService);
    send(): Promise<{
        value: string;
    }>;
    sendPushTask(kafkaTaskDto: KafkaTaskDto): Promise<void | import("kafkajs").RecordMetadata[]>;
}
