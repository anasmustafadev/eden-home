import { db } from "~/server/db/index";
import { allotment } from "~/server/db/schema";
import { type allotmentType } from "~/types/allotmentType";

export async function GET() {
  const data = await db.select().from(allotment);
  console.log(data);
  return Response.json(data);
}

export async function POST(request: Request) {
  const res = (await request.json()) as allotmentType;
  const data = await db.insert(allotment).values({
    plotId: res.plotId,
    clientId: res.clientId,
    allotedBy: res.allotedBy,
    advancePercentage: res.advancePercentage,
    advanceTotal: res.advanceTotal,
    months: res.months,
    allotmentDate: new Date(res.allotmentDate),
    installmentType: res.installmentType,
  });
  return Response.json(data, {
    status: 201,
  });
}
