import { ListQueryEntity } from "../../../domain/entities/list-query";

const defaultLimit = 2;

export class ListQueryDto {
  start?: string;
  end?: string;
  limit?: number;

  constructor({
    start,
    end,
    limit,
  }: {
    start?: string;
    end?: string;
    limit?: number;
  }) {
    this.start = start;
    this.end = end;
    this.limit = limit || defaultLimit;
  }

  toEntity(): ListQueryEntity {
    return new ListQueryEntity({
      end: this.end ? new Date(this.end) : undefined,
      start: this.start ? new Date(this.start) : undefined,
      limit: this.limit,
    });
  }
}
