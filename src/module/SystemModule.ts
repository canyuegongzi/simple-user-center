import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from '../model/entity/SystemEntity';
import { SystemService } from '../service/SystemService';
import { SystemController } from '../controller/SystemController';

@Module({
  imports: [
    TypeOrmModule.forFeature([ System ]),
  ],
  controllers: [ SystemController ],
  providers: [ SystemService ],
  exports: [],
})
export class SystemModule {}
