import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';
import { eq } from 'drizzle-orm';
import { SelectUser, usersTable } from '~/database/schema';
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
}
