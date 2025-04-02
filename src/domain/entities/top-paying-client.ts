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
}
