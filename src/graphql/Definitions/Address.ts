import { objectType } from "nexus";
import { Context } from "../../context";

export const Address = objectType({
    name: "Address",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.field("createdAt", { type: "DateTime" });
      t.nonNull.field("updatedAt", { type: "DateTime" });
      t.nonNull.string("addressLine1");
      t.string("addressLine2");
      t.nonNull.string("city");
      t.nonNull.string("state");
      t.nonNull.string("zip");
      t.nonNull.string("country");
      t.field("AddressType", {
        type: "AddressType",
        resolve: (parent, _, context: Context) => {
          return context.prisma.address
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .AddressType();
        },
      });
    },
  });