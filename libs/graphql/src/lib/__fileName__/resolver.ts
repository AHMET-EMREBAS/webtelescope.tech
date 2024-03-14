import { Resolver, Parent } from '@nestjs/graphql';
import { SampleObject } from './object';
import { CreateSampleInput } from './input';

@Resolver(() => SampleObject)
export class SampleResolver {
  CREATE(@Parent() object: CreateSampleInput) {
    console.log(object);
  }
}
