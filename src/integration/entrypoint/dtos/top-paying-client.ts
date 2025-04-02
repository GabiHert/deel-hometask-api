import { TopPayingClientEntity } from "../../../domain/entities/top-paying-client";

export class TopPayingClientDto {
  id: number;
  fullName: string;
  paid: number;

  constructor({ id, fullName, paid }: TopPayingClientEntity) {
    this.id = id;
    this.fullName = fullName;
    this.paid = paid;
  }
}
