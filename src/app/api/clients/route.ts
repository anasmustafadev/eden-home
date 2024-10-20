import { eq } from "drizzle-orm";
import { db } from "~/server/db/index";
import { person } from "~/server/db/schema";
import { type personType } from "~/types/personType";

export async function GET() {
  const data = await db.select().from(person);
  console.log(data);
  return Response.json(data);
}

export async function POST(request: Request) {
  const res = (await request.json()) as personType;
  const data = await db
    .insert(person)
    .values({
      phone: res.phone,
      address: res.address,
      cnic: res.cnic,
      name: res.name,
    })
    .returning();
  return Response.json(data, {
    status: 201,
  });
}

export async function PUT(request: Request) {
  const res = (await request.json()) as personType;
  const data = await db
    .update(person)
    .set({
      phone: res.phone,
      address: res.address,
      cnic: res.cnic,
      name: res.name,
    })
    .where(eq(person.id, res.id))
    .returning();
  return Response.json(data, {
    status: 202,
  });
}
