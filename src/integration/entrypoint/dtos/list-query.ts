import { ListQueryEntity } from "../../../domain/entities/list-query";

const defaultLimit = 2;

export class ListQueryDto {
  start?: Date;
  end?: Date;
  limit?: number;

  constructor({
    start,
    end,
    limit,
  }: {
    start: Date;
    end: Date;
    limit: number;
  }) {
    this.start = start;
    this.end = end;
    this.limit = limit || defaultLimit;
  }

  toEntity(): ListQueryEntity {
    return new ListQueryEntity(this);
  }
}
