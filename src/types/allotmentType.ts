export type allotmentType = {
  clientId: number | null;
  plotId: number | null;
  allotmentId: number;
  allotmentDate: Date;
  months: number;
  installmentType: number | null;
  advancePercentage: number;
  advanceTotal: number | null;
  allotedBy: number;
};
