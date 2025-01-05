import { Inject, Injectable } from '@nestjs/common';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';
import { DRIZZLE } from '../database/database.module';
import { socialLinksTable } from '~/database/schema';
import { DrizzleDB } from '../database/drizzle';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class SocialLinksService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(createSocialLinkDto: CreateSocialLinkDto) {
    return this.db.insert(socialLinksTable).values(createSocialLinkDto);
  }

  findAll() {
    return this.db.query.socialLinksTable.findMany({
      where: eq(socialLinksTable.isDeleted, false),
    });
  }

  findOne(id: string) {
    return this.db.query.socialLinksTable.findFirst({
      where: and(
        eq(socialLinksTable.id, id),
        eq(socialLinksTable.isDeleted, false),
      ),
    });
  }

  update(id: string, updateSocialLinkDto: UpdateSocialLinkDto) {
    return this.db
      .update(socialLinksTable)
      .set(updateSocialLinkDto)
      .where(eq(socialLinksTable.id, id));
  }

  remove(id: string) {
    return this.db
      .update(socialLinksTable)
      .set({ isDeleted: true })
      .where(eq(socialLinksTable.id, id));
  }
}
