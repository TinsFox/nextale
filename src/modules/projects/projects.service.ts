import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { projectsTable } from '~/database/schema';
import { asc, eq } from 'drizzle-orm';

@Injectable()
export class ProjectsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }

  create(createProjectDto: CreateProjectDto) {
    return this.db.insert(projectsTable).values(createProjectDto);
  }

  findAll() {
    return this.db.query.projectsTable.findMany({
      orderBy: asc(projectsTable.order),
      where: eq(projectsTable.status, 'published'),
    });
  }

  findAllWithAdmin() {
    return this.db.query.projectsTable.findMany({
      orderBy: asc(projectsTable.order),
    });
  }

  findOne(id: number) {
    return this.db.query.projectsTable.findFirst({
      where: eq(projectsTable.id, id),
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.db
      .update(projectsTable)
      .set(updateProjectDto)
      .where(eq(projectsTable.id, id));
  }

  remove(id: number) {
    return this.db
      .update(projectsTable)
      .set({ isDeleted: true })
      .where(eq(projectsTable.id, id));
  }
}
