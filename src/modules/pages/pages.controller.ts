import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IDParams } from '~/common/dto/id.dto';

@ApiTags('Pages')
@ApiResponse({ status: 201, description: 'Page created successfully' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @ApiBody({ type: CreatePageDto })
  @ApiOperation({ summary: 'Create a new page' })
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pages' })
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a page by id' })
  findOne(@Param() { id }: IDParams) {
    return this.pagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePageDto })
  @ApiOperation({ summary: 'Update a page by id' })
  update(@Param() { id }: IDParams, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a page by id' })
  remove(@Param() { id }: IDParams) {
    return this.pagesService.remove(+id);
  }
}
