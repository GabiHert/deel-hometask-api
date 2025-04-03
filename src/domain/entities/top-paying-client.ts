import { TopPayingClientDto } from "../../integration/entrypoint/dtos/top-paying-client";

export class TopPayingClientEntity {
  id: number;
  fullName: string;
  paid: number;

  constructor({
    id,
    fullName,
    paid,
  }: {
    id: number;
    fullName: string;
    paid: number;
  }) {
    this.id = id;
    this.fullName = fullName;
    this.paid = paid;
  }

  static FromEntities(
    topPayingClientEntities: TopPayingClientEntity[]
  ): TopPayingClientEntity[] {
    return topPayingClientEntities.map((e) => new TopPayingClientDto(e));
  }
}
