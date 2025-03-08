import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsAdminController } from './projects.admin.controller';
import { ProjectsAdminService } from './projects.admin.service';

@Module({
  controllers: [ProjectsController, ProjectsAdminController],
  providers: [ProjectsService, ProjectsAdminService],
})
export class ProjectsModule {}
