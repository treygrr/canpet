import { objectType } from "nexus";
import { Context } from "../../context";

export const Animal = objectType({
    name: "Animal",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.field("createdAt", { type: "DateTime" });
      t.nonNull.field("updatedAt", { type: "DateTime" });
      t.nonNull.string("name");
      t.nonNull.boolean("adopted");
      t.nonNull.boolean("published");
      t.field("Location", {
        type: "Location",
        resolve: (parent, _, context: Context) => {
          return context.prisma.animal
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Location();
        },
      });
      t.field("Species", {
        type: "Species",
        resolve: (parent, _, context: Context) => {
          return context.prisma.animal
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Species();
        },
      });
      t.field("birthDate", { type: "DateTime" });
      t.field("adoptedDate", { type: "DateTime" });
      t.field("adoptionFee", { type: "Int" });
      t.field("age", { type: "Int" });
      t.field("weight", { type: "Int" });
      t.field("height", { type: "Int" });
      t.field("description", { type: "String" });
      t.list.field("breeds", {
        type: "Breed",
        resolve: (parent, _, context: Context) => {
          return context.prisma.animal
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Breeds();
        },
      });
      t.list.field("animalColors", {
        type: "Color",
        resolve: (parent, _, context: Context) => {
          return context.prisma.animal
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Colors();
        },
      });
    },
  });