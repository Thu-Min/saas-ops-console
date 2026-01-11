import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';
import { projects } from 'src/db/schema/projects.schema';

@Injectable()
export class ProjectsService {
  async findById(id: string) {
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    return result[0] ?? null;
  }
}
