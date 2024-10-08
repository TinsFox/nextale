import { Controller, Post, Body, Param, All, Req, Res } from '@nestjs/common';
import { CloudFunctionsService } from './cloud-functions.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCloudFunctionDto } from './dto/create-function.dto';
import { Public } from '~/common/decorators/public.decorator';

@ApiTags('Cloud Functions')
@Controller('cloud-functions')
export class CloudFunctionsController {
  constructor(private readonly cloudFunctionsService: CloudFunctionsService) {}

  @Post()
  @ApiBody({ type: CreateCloudFunctionDto })
  @ApiOperation({ summary: 'Create a new cloud function' })
  async createCloudFunction(@Body() data: CreateCloudFunctionDto) {
    return this.cloudFunctionsService.createCloudFunction(data);
  }

  @Public()
  @All('execute/:url')
  @ApiOperation({ summary: 'Execute a cloud function' })
  async executeCloudFunction(
    @Param('url') url: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.cloudFunctionsService.executeCloudFunction(url, req, res);
  }
}
