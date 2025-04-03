import { TopPayingClientEntity } from "../../../domain/entities/top-paying-client";

export function parseResultToTopPayingClientEntity(
  results: any[]
): TopPayingClientEntity[] {
  return results.map(
    (result: any) =>
      new TopPayingClientEntity({
        id: result.clientId,
        fullName: result.fullName,
        paid: parseFloat(result.totalPaid),
      })
  );
}
