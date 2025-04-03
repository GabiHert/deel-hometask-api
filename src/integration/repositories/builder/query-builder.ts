export class QueryBuilder {
  static buildWhereClauseForPaymentDate(
    start?: Date,
    end?: Date
  ): { whereClause: string; replacements: Record<string, any> } {
    const formattedStart = start ? start.toISOString() : undefined;
    const formattedEnd = end ? end.toISOString() : undefined;

    let whereClause = "WHERE Jobs.paid = true";
    const replacements: Record<string, any> = {};

    if (formattedStart && formattedEnd) {
      whereClause += ` AND Jobs.paymentDate BETWEEN :start AND :end`;
      replacements.start = formattedStart;
      replacements.end = formattedEnd;
    } else if (formattedStart) {
      whereClause += ` AND Jobs.paymentDate >= :start`;
      replacements.start = formattedStart;
    } else if (formattedEnd) {
      whereClause += ` AND Jobs.paymentDate <= :end`;
      replacements.end = formattedEnd;
    }

    return { whereClause, replacements };
  }
}
