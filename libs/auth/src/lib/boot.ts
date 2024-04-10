import { bootstrap } from '@webpackages/core';
import { AppModule } from './module';

export async function bootauth() {
  await bootstrap(AppModule);
}
