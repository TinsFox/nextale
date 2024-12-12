import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { DrizzleModule } from '../database/database.module';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  imports: [DrizzleModule],
})
export class SettingsModule {}
