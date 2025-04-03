export class ClientDepositDto {
  amount: number;
  constructor({ amount }: { amount: number }) {
    this.amount = amount;
  }
}
