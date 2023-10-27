import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  index,
  date,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
// import { InferModel } from "drizzle-o.rm";

import { InferModel, desc } from "drizzle-orm";

export const UsersTable = pgTable(
    "applied_user",
    {
      id: serial("id").primaryKey().notNull(),
      firstName: text("first_name").notNull(),
      lastName: text("last_name").notNull(),
      phoneNumber: integer("phone_number").notNull(),
      city: text("city").notNull(),
      country: text("country").notNull(),
      email: text("email").notNull(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow(),
      date: date('date').defaultNow(),
    },
    (users) => {
      return {
        uniqueIdx: uniqueIndex("unique_idx").on(
          users.phoneNumber,
          users.email
        ),
        index: index("idx_sort_id").on(users.id).desc(),
      };
    }
  );


  export type User = InferModel<typeof UsersTable>;
  export type NewUser = InferModel<typeof UsersTable, "insert">;;
  
 