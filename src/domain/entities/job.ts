export class JobEntity {
  id: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate?: Date;
  contractId: number;

  constructor({
    id,
    description,
    price,
    paid,
    paymentDate,
    contractId,
  }: {
    description: string;
    id: number;
    price: number;
    paid: boolean;
    paymentDate: string;
    contractId: number;
  }) {
    this.description = description;
    this.price = price;
    this.paid = paid;
    this.paymentDate = paymentDate ? new Date(paymentDate) : undefined;
    this.contractId = contractId;
    this.id = id;
  }
}
