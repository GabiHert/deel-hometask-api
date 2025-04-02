import { ContractEntity } from "../../../domain/entities/contract";

export class ContractDto {
  id: number;
  terms: string;
  status: string;
  clientId: string;
  contractorId: number;
  constructor({ id, terms, status, clientId, contractorId }: ContractEntity) {
    this.id = id;
    this.terms = terms;
    this.status = status;
    this.clientId = clientId;
    this.contractorId = contractorId;
  }
}
