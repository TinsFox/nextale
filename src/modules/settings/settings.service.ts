import { Inject, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { eq } from 'drizzle-orm';
import { settingsTable } from '~/database/schema';

@Injectable()
export class SettingsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  create(createSettingDto: CreateSettingDto) {
    return this.db.insert(settingsTable).values(createSettingDto);
  }

  findAll() {
    return this.db.query.settingsTable.findMany();
  }

  findOne(name: string) {
    return this.db.query.settingsTable.findFirst({
      where: eq(settingsTable.name, name),
    });
  }

  update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.db
      .update(settingsTable)
      .set(updateSettingDto)
      .where(eq(settingsTable.id, id));
  }

  remove(id: string) {
    return this.db
      .update(settingsTable)
      .set({
        isDeleted: true,
      })
      .where(eq(settingsTable.id, id));
  }
}
