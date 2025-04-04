export class ProfileEntity {
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
  }: {
    id: number;
    firstName: string;
    lastName: string;
    profession: string;
    balance: number;
    type: string;
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profession = profession;
    this.balance = balance;
    this.type = type;
  }
}
