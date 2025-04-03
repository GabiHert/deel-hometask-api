const defaultLimit = 2;
const defaultPage = 0;
export class ListQueryEntity {
  start?: Date;
  end?: Date;
  limit: number;
  page: number;

  constructor({
    start,
    end,
    limit,
    page,
  }: {
    start?: Date;
    end?: Date;
    limit?: number;
    page?: number;
  }) {
    this.start = start;
    this.end = end;
    this.limit = limit || defaultLimit;
    this.page = page || defaultPage;
  }
}
