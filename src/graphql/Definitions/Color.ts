import { objectType } from "nexus";

export const Color = objectType({
    name: "Color",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.field("createdAt", { type: "DateTime" });
      t.nonNull.field("updatedAt", { type: "DateTime" });
      t.nonNull.string("name");
    },
  });