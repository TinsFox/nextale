import { count } from 'drizzle-orm';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { DrizzleDB } from '~/modules/database/drizzle';
import { dbSchema } from '~/database/schema';

const defaultPaginationQuery = {
  page: 1,
  limit: 10,
};

export async function paginateQuery<T>(
  db: DrizzleDB,
  table: any,
  paginationQuery: PaginationQueryDto,
): Promise<PaginatedResult<T>> {
  const {
    page = defaultPaginationQuery.page,
    limit = defaultPaginationQuery.limit,
  } = paginationQuery;

  const offset = (page - 1) * limit;

  const query = db.query[table].findMany({
    offset: offset,
    limit: limit,
  });

  const totalQuery = db.select({ count: count() }).from(dbSchema[table]);

  const [data, [{ count: total }]] = await Promise.all([query, totalQuery]);

  return {
    data: data as T[],
    meta: {
      pagination: {
        total: Number(total),
        page,
        pageSize: limit,
        pageCount: Math.ceil(Number(total) / limit),
      },
    },
  };
}
