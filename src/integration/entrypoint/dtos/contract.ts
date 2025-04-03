import { ContractEntity } from "../../../domain/entities/contract";

export class ContractDto {
  id: number;
  terms: string;
  status: string;
  clientId: number;
  contractorId: number;
  constructor({ id, terms, status, clientId, contractorId }: ContractEntity) {
    this.id = id;
    this.terms = terms;
    this.status = status;
    this.clientId = clientId;
    this.contractorId = contractorId;
  }
  static FromEntities(contracts: ContractEntity[]): ContractDto[] {
    return contracts.map((contract) => new ContractDto(contract));
  }
}
