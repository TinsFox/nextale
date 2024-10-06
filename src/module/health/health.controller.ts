import { Controller } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@ApiResponse({ status: 200, description: 'Server is running' })
@Controller('health')
export class HealthController {}
