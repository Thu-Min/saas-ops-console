import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PolicyGuard } from 'src/authz/policy.guard';
import { ProjectsService } from './projects.service';
import { CapabilityService } from 'src/capabilities/capability.service';
import { Authorize } from 'src/authz/authorize.decorator';
import { Resource } from 'src/authz/resources';
import { Action } from 'src/authz/actions';

@Controller('projects')
@UseGuards(JwtAuthGuard, PolicyGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly capabilityService: CapabilityService,
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
        canRead: capabilityMap.read ?? false,
        canUpdate: capabilityMap.update ?? false,
        canDelete: capabilityMap.delete ?? false,
      },
    };
  }
}
