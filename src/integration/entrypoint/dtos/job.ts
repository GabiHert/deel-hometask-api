import { JobEntity } from "../../../domain/entities/job";

export class JobDto {
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
  }: JobEntity) {
    this.description = description;
    this.price = price;
    this.paid = paid;
    this.paymentDate = paymentDate;
    this.contractId = contractId;
  }

  static FromEntities(jobs: JobEntity[]): JobDto[] {
    return jobs.map((job) => new JobDto(job));
  }
}
