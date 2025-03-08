import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { projectsTable } from 'apps/api/src/database/schema';
import { asc, eq } from 'drizzle-orm';

@Injectable()
export class ProjectsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createProjectDto: CreateProjectDto) {
    return this.db.insert(projectsTable).values(createProjectDto);
  }

  findAll() {
    return this.db.query.projectsTable.findMany({
      orderBy: asc(projectsTable.order),
      where: eq(projectsTable.status, 'published'),
    });
  }

  findOne(id: string) {
    return this.db.query.projectsTable.findFirst({
      where: eq(projectsTable.id, id),
    });
  }
}
