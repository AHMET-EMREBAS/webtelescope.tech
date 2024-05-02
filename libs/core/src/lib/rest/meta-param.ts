import { Param } from '@nestjs/common';
import { ApiPathKeys } from '@webpackages/utils';

export function Meta() {
  return Param(ApiPathKeys.METADATA_KEY);
}
