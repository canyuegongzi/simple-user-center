import { Module} from '@nestjs/common';
import {KafkaTaskController} from '../controller/kafkaTask.controller';
import {KafkaModule} from '../common/kafka/kafka.module';
import {TaskKafkaProductService} from '../service/service/taskKafkaProduct.service';
import {CommonConfigService} from '../service/service/CommonConfigService';
import {CommonConfigKey} from '../config/CommonConfigInterface';
const commonConfigService = new CommonConfigService();

@Module({
    imports: [
        KafkaModule.register({
            clientId: 'test-app-client',
            brokers: [commonConfigService.get(CommonConfigKey.KAfKA)],
            groupId: 'test-app-group',
        }),
    ],
    controllers: [KafkaTaskController],
    providers: [TaskKafkaProductService],
    exports: [],
})
export class KafkaTaskModule {}
