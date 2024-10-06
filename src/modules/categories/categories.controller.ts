import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiResponse, ApiExtraModels } from '@nestjs/swagger';
import { IDParams } from '~/common/dto/id.dto';

@ApiTags('Categories')
@ApiResponse({ status: HttpStatus.OK, description: 'OK' })
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Internal Server Error',
})
@ApiExtraModels(CreateCategoryDto, UpdateCategoryDto)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: IDParams) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() id: IDParams, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param() id: IDParams) {
    return this.categoriesService.remove(+id);
  }
}
