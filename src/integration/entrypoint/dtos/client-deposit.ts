import { ClientDepositEntity } from "../../../domain/entities/client-deposit";

export class ClientDepositDto {
  amount: number;
  constructor({ amount }: { amount: number }) {
    this.amount = amount;
  }

  toEntity(): ClientDepositEntity {
    return new ClientDepositEntity(this.amount);
  }
}
