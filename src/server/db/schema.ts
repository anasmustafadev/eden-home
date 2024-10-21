import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  varchar,
  integer,
  real,
  timestamp,
} from "drizzle-orm/pg-core";

// Create table with project-specific prefix
export const createTable = pgTableCreator((name) => `eden_home_${name}`);

/////////////////////////
// Person Table
/////////////////////////

export const person = createTable(
  "person",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    cnic: varchar("cnic", { length: 15 }).notNull(), // Assuming Pakistani CNIC format
    phone: varchar("phone", { length: 15 }).notNull(),
    address: varchar("address", { length: 512 }).notNull(),
  },
  (person) => ({
    cnicIndex: index("cnic_idx").on(person.cnic),
  }),
);

/////////////////////////
// Client Table
/////////////////////////

export const client = createTable("client", {
  clientId: serial("client_id").primaryKey(),
  type: integer("type").references(() => lookup.id), // Purchaser = 0 from Lookup
});

/////////////////////////
// Plot Table
/////////////////////////

export const plot = createTable("plot", {
  plotId: serial("plot_id").primaryKey(),
  type: integer("type").references(() => lookup.id), // Plot Types: 1=Commercial, 2=Residential
  area: integer("area").notNull(), // In Marla
  width: real("width").notNull(), // Width in feet.inches
  height: real("height").notNull(), // Height in feet.inches
  ratePerMarla: integer("rate_per_marla").notNull(),
  price: integer("price").default(0), // Derived attribute (can be calculated in app logic)
  feature: integer("feature").references(() => lookup.id), // Plot Features: 7=Park Facing, 8=Main Facing
  total: integer("total").default(0), // Derived total price
});

/////////////////////////
// Allotment Table
/////////////////////////

export const allotment = createTable("allotment", {
  allotmentId: serial("allotment_id").primaryKey(),
  allotmentDate: timestamp("allotment_date", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  clientId: integer("client_id").references(() => client.clientId),
  plotId: integer("plot_id").references(() => plot.plotId),
  months: integer("months").notNull(), // Total months for installment
  installmentType: integer("installment_type").references(() => lookup.id), // Installment types
  advancePercentage: integer("advance_percentage").notNull(),
  advanceTotal: integer("advance_total").default(0), // Derived attribute
  allotedBy: integer("alloted_by").notNull(), // Allotted by User ID
});

/////////////////////////
// Lookup Table with values
/////////////////////////

export const lookup = createTable("lookup", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 256 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
});
