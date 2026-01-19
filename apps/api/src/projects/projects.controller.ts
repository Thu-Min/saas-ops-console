import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PolicyGuard } from 'src/authz/policy.guard';
import { ProjectsService } from './projects.service';
import { CapabilityService } from 'src/capabilities/capability.service';
import { Authorize } from 'src/authz/authorize.decorator';
import { Resource } from 'src/authz/resources';
import { Action } from 'src/authz/actions';
import { RequestContextService } from 'src/context/request-context.service';
import { AuditService } from 'src/audit/audit.service';

@Controller('projects')
@UseGuards(JwtAuthGuard, PolicyGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly capabilityService: CapabilityService,
    private readonly ctx: RequestContextService,
    private readonly auditService: AuditService,
  ) {}

  @Get(':id')
  @Authorize(Resource.PROJECT, Action.READ)
  async getProject(@Param('id') id: string) {
    const project = await this.projectsService.findById(id);

    if (!project) {
      throw new NotFoundException();
    }

    const capabilityMap = this.capabilityService.evaluate(
      Resource.PROJECT,
      project,
      [Action.READ, Action.UPDATE, Action.DELETE],
    );

    return {
      data: project,
      capabilities: {
        canUpdate: capabilityMap.update ?? false,
        canDelete: capabilityMap.delete ?? false,
      },
    };
  }

  @Get()
  @Authorize(Resource.PROJECT, Action.READ)
  async listProjects() {
    const { organizationId } = this.ctx.get();

    const data =
      await this.projectsService.findAllByOrganization(organizationId);

    const capabilities = {
      canCreate:
        this.capabilityService.evaluate(Resource.PROJECT, { organizationId }, [
          Action.CREATE,
        ]).create ?? false,
    };

    return {
      data,
      capabilities,
    };
  }

  @Post()
  @Authorize(Resource.PROJECT, Action.CREATE)
  async createProject(@Body('name') name: string) {
    const { organizationId } = this.ctx.get();

    const project = this.projectsService.create(name, organizationId);

    await this.auditService.log({
      resource: Resource.PROJECT,
      action: 'create',
      resourceId: (await project).id,
      metadata: { name: (await project).name },
    });

    return project;
  }
}
