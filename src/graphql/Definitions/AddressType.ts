import { objectType } from 'nexus'
import { Context } from '../../context'

export const AddressType = objectType({
    name: "AddressType",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.field("createdAt", { type: "DateTime" });
      t.nonNull.field("updatedAt", { type: "DateTime" });
      t.nonNull.string("name");
    }
  });