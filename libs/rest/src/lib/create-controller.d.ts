import { CanActivate, Type } from '@nestjs/common';
import { IController } from './controller';
export type CreateControllerOptions = {
    entity: Type;
    createDto: Type;
    updateDto: Type;
    log?: boolean;
    guards?: Type<CanActivate>[];
};
export declare function CreateController<E extends Type, C extends Type, U extends Type>(options: CreateControllerOptions): Type<IController<E, C, U>>;
