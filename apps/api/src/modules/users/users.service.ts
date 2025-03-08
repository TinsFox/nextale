import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { eq, sql } from 'drizzle-orm';
import { SelectUser, usersTable } from 'apps/api/src/database/schema';
import { CreateUserDto } from '../auth/dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findOne(username: string): Promise<SelectUser | undefined> {
    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.username, username),
    });
    return user;
  }

  async create(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (await this.findOne(user.username)) {
      throw new BadRequestException('username already exists');
    }
    return this.db.insert(usersTable).values({
      username: user.username,
      password: hashedPassword,
    });
  }

  async queryCurrentUser(id: string) {
    return this.db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      columns: {
        password: false,
      },
    });
  }

  async querySiteProfile() {
    const socialLinks = await this.db.query.socialLinksTable.findMany({
      orderBy: (links) => [links.order],
    });

    const user = await this.db.query.usersTable.findFirst({
      where: sql`${usersTable.roles}::jsonb @> '["owner"]'::jsonb`,
      columns: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Site owner not found');
    }

    return {
      ...user,
      socialLinks,
    };
  }
}
