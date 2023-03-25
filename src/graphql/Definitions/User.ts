import { Context } from "../../context";
import { objectType } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.field("createdAt", { type: 'DateTime' });
      t.nonNull.field("updatedAt", { type: 'DateTime' });
      t.nonNull.string("username");
      t.nonNull.string("email");
      t.nonNull.string("firstName");
      t.nonNull.string("lastName");
      t.int("age");
      t.string("bio");
      t.list.field("Addresses", {
        type: "Address",
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Addresses();
        },
      });
      t.list.field("Posts", {
        type: "Post",
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Posts();
        },
      });
      t.list.field("Locations", {
        type: "Location",
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .Locations();
        },
      });
    },
  });