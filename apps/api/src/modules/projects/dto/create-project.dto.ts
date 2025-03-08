import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import {
  PROJECT_STATUS,
  ProjectStatus,
} from 'apps/api/src/common/constants/project.constant';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  docsUrl: string;

  @IsString()
  @IsNotEmpty()
  previewUrl: string;

  @IsString()
  videoUrl: string;

  @IsString()
  summary: string;

  @IsArray()
  previewImage: string[];

  @IsString()
  readme: string;

  @IsNumber()
  order: number;

  @IsString()
  coverImage: string;

  @IsArray()
  techStack: string[];

  @IsString()
  @IsEnum(PROJECT_STATUS)
  status: ProjectStatus;
}
