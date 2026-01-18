import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { DbClient } from 'src/db';
import { projects } from 'src/db/schema/projects.schema';

@Injectable()
export class ProjectsService {
  constructor(@Inject('DB') private readonly db: DbClient) {}

  async findById(id: string) {
    const result = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findAllByOrganization(organizationId: string) {
    return this.db
      .select()
      .from(projects)
      .where(eq(projects.organizationId, organizationId));
  }

  async create(name: string, organizationId: string) {
    const [project] = await this.db
      .insert(projects)
      .values({
        name,
        organizationId,
      })
      .returning();

    return project;
  }
}
