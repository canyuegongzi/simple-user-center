import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {System} from '../model/entity/system.entity';
import {SystemService} from '../service/service/system.service';
import {SystemController} from '../controller/system.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([System]),
  ],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [],
})
export class SystemModule {}
