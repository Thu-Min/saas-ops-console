import { RequestContext } from 'src/context/request-context.interface';
import { Policy } from './policy.interface';
import { Resource } from './resources';
import { Action } from './actions';

interface Project {
  organizationId: string;
}

export class ProjectPolicy implements Policy<Project> {
  resource = Resource.PROJECT;

  can(ctx: RequestContext, action: Action, project?: Project): boolean {
    if (!project) return false;

    if (project.organizationId !== ctx.organizationId) {
      return false;
    }

    switch (action) {
      case Action.READ:
        return true;

      case Action.CREATE:
      case Action.UPDATE:
        return ['OWNER', 'ADMIN'].includes(ctx.role);

      case Action.DELETE:
        return ctx.role === 'OWNER';

      default:
        return false;
    }
  }
}
