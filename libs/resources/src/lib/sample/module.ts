import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample as EntityClass, SampleView as EntityView } from './entity';
import { SampleController as EntityController } from './controllers';
import { SampleSubscriber as EntitySubscriber } from './events';

@Module({
  imports: [
    EventEmitterModule,
    TypeOrmModule.forFeature([EntityClass, EntityView]),
  ],
  controllers: [EntityController],
  providers: [
    EntitySubscriber,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { exposeUnsetFields: false },
      }),
    },
  ],
})
export class SampleModule {}
