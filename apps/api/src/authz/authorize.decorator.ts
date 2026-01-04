import { SetMetadata } from '@nestjs/common';
import { Action } from './actions';
import { Resource } from './resources';

export const Authorize = (resource: Resource, action: Action) =>
  SetMetadata('resource', resource) && SetMetadata('action', action);
