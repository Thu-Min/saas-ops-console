import { Action } from './actions';
import { Resource } from './resources';
import { RequestContext } from '../context/request-context.interface';

export interface Policy<T = unknown> {
  resource: Resource;
  can(ctx: RequestContext, action: Action, subject?: T): boolean;
}
