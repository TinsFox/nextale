import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { projects } from '~/database/schema';
import { asc, eq } from 'drizzle-orm';

@Injectable()
export class ProjectsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createProjectDto: CreateProjectDto) {
    return this.db.insert(projects).values(createProjectDto);
  }

  findAll() {
    return this.db.query.projects.findMany({
      orderBy: asc(projects.order),
    });
  }

  findOne(id: number) {
    return this.db.query.projects.findFirst({
      where: eq(projects.id, id),
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.db
      .update(projects)
      .set(updateProjectDto)
      .where(eq(projects.id, id));
  }

  remove(id: number) {
    return this.db
      .update(projects)
      .set({ isDeleted: true })
      .where(eq(projects.id, id));
  }
}
