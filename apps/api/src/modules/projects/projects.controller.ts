import { Public } from 'apps/api/src/common/decorators/public.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Public/Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
