import { Module } from '@nestjs/common';
import { CloudFunctionsController } from './cloud-functions.controller';
import { CloudFunctionsService } from './cloud-functions.service';

@Module({
  controllers: [CloudFunctionsController],
  providers: [CloudFunctionsService],
})
export class CloudFunctionsModule {}