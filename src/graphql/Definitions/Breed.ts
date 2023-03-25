import { objectType } from "nexus";
import { Context } from "../../context";

export const Breed = objectType({
    name: "Breed",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.field("createdAt", { type: "DateTime" });
      t.nonNull.field("updatedAt", { type: "DateTime" });
      t.nonNull.string("name");
      t.field("Species", {
        type: "Species",
        resolve: (parent, _, context: Context) => {
          return context.prisma.breed
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Species();
        },
      });
    },
  });