export enum ContractStatusEnum {
  NEW = "new",
  IN_PROGRESS = "in_progress",
  TERMINATED = "terminated",
}
export function contractStatusFromString(status: string): ContractStatusEnum {
  const value = Object.values(ContractStatusEnum).find(
    (value) => value === status
  );
  if (!value) {
    throw new Error("Invalid contract status");
  }
  return value;
}
