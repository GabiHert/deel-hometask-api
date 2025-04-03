export enum ProfileTypeEnum {
  CLIENT = "client",
  CONTRACTOR = "contractor",
}
export function profileTypeFromEnum(status: string): ProfileTypeEnum {
  const value = Object.values(ProfileTypeEnum).find(
    (value) => value === status
  );
  if (!value) {
    throw new Error("Invalid contract status");
  }
  return value;
}
