import { Module} from '@nestjs/common';
import {KafkaTaskController} from '../controller/kafkaTask.controller';
import {KafkaModule} from '../common/kafka/kafka.module';
import {TaskKafkaProductService} from '../service/service/taskKafkaProduct.service';
import {kafkaConfig} from '../config/config';

@Module({
    imports: [
        KafkaModule.register({
            clientId: kafkaConfig.clientId,
            brokers: [kafkaConfig.url],
            groupId: kafkaConfig.groupId,
        }),
    ],
    controllers: [KafkaTaskController],
    providers: [TaskKafkaProductService],
    exports: [],
})
export class KafkaTaskModule {}
