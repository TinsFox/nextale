import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CatsService } from './cats.service';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Post()
  @Roles(Role.Admin)
  create() {
    this.catsService.create();
  }
}
