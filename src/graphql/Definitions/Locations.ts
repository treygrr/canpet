import { objectType } from 'nexus'
import { Context } from '../../context'

export const Location = objectType({
    name: "Location",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.field("createdAt", { type: "DateTime" });
      t.nonNull.field("updatedAt", { type: "DateTime" });
      t.nonNull.string("name");
      t.nonNull.boolean("published");
      t.list.field("Users", {
        type: "User",
        resolve: (parent, _, context: Context) => {
          return context.prisma.location
            .findUnique({
              where: { id: parent.id },
            })
            .Users();
        },
      });
  
      t.list.field("Posts", {
        type: "Post",
        resolve: (parent, _, context: Context) => {
          return context.prisma.location
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Posts();
        },
      });
      t.list.field("Animals", {
        type: "Animal",
        resolve: (parent, _, context: Context) => {
          return context.prisma.location
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Animals();
        },
      });
      t.list.field("Addresses", {
        type: "Address",
        resolve: (parent, _, context: Context) => {
          return context.prisma.location
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Addresses();
        },
      });
    },
  });