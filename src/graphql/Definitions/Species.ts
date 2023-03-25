import { objectType } from "nexus";
import { Context } from "../../context";

export const Species = objectType({
    name: "Species",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.field("createdAt", { type: "DateTime" });
      t.nonNull.field("updatedAt", { type: "DateTime" });
      t.nonNull.string("name");
      t.list.field("Animals", {
        type: "Animal",
        resolve: (parent, _, context: Context) => {
          return context.prisma.species
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Animals();
        },
      });
      t.list.field("Breeds", {
        type: "Breed",
        resolve: (parent, _, context: Context) => {
          return context.prisma.species
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Breeds();
        },
      });
    },
  });