import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSampleInput } from './create';

@InputType()
export class UpdateSampleInput extends PartialType(CreateSampleInput) {}
