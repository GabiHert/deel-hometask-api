import { JobEntity } from "../../../domain/entities/job";

export class JobDto {
  id: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate: string | null;
  contractId: number;

  constructor({
    id,
    description,
    price,
    paid,
    paymentDate,
    contractId,
  }: JobEntity) {
    this.id = id;
    this.description = description;
    this.price = price;
    this.paid = paid;
    this.paymentDate = paymentDate ? new Date(paymentDate).toISOString() : null;
    this.contractId = contractId;
  }

  static FromEntities(jobs: JobEntity[]): JobDto[] {
    return jobs.map((job) => new JobDto(job));
  }
}
