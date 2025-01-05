import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsAdminService } from './projects.admin.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin/Projects')
@Controller('admin/projects')
export class ProjectsAdminController {
  constructor(private readonly projectsService: ProjectsAdminService) {}

  @Post()
  @ApiBody({ type: CreateProjectDto })
  @ApiOperation({ summary: 'Create a new project' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProjectDto })
  @ApiOperation({ summary: 'Update a project by id' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by id' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
