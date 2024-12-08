import { db } from "~/server/db/index";
import { allotment } from "~/server/db/schema";

export async function GET() {
  const data = await db.select().from(allotment);
  console.log(data);
  return Response.json(data);
}
