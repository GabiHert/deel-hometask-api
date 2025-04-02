const defaultLimit = 2;

export class ListQueryEntity {
  start?: Date;
  end?: Date;
  limit?: number;

  constructor({
    start,
    end,
    limit,
  }: {
    start?: Date;
    end?: Date;
    limit?: number;
  }) {
    this.start = start;
    this.end = end;
    this.limit = limit || defaultLimit;
  }
}
