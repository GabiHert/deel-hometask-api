import { ProfileEntity } from "../../../domain/entities/profile";

export class ProfileDto {
  id: number;
  firstName: string;
  lastName!: string;
  profession: string;
  balance: number;
  type: string;

  constructor({
    balance,
    firstName,
    id,
    lastName,
    profession,
    type,
  }: ProfileEntity) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profession = profession;
    this.balance = balance;
    this.type = type;
  }
}
