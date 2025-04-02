export class JobEntity {
  description: string;
  price: number;
  paid: boolean;
  paymentDate: string;
  contractId: number;

  constructor({
    description,
    price,
    paid,
    paymentDate,
    contractId,
  }: {
    description: string;
    price: number;
    paid: boolean;
    paymentDate: string;
    contractId: number;
  }) {
    this.description = description;
    this.price = price;
    this.paid = paid;
    this.paymentDate = paymentDate;
    this.contractId = contractId;
  }
}
