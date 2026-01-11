import { Action } from 'src/authz/actions';

export type CapabilityMap = {
  [K in Action]?: boolean;
};
