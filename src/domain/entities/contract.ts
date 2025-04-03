import {
  ContractStatusEnum,
  contractStatusFromString,
} from "../enums/contract-status";

export class ContractEntity {
  id: number;
  terms: string;
  status: ContractStatusEnum;
  clientId: number;
  contractorId: number;

  constructor({
    id,
    terms,
    status,
    clientId,
    contractorId,
  }: {
    id: number;
    terms: string;
    status: string;
    clientId: number;
    contractorId: number;
  }) {
    this.id = id;
    this.terms = terms;
    this.status = contractStatusFromString(status);
    this.clientId = clientId;
    this.contractorId = contractorId;
  }
}
