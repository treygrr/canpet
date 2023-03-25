import { objectType } from "nexus";

export const DeletedUserDevices = objectType({
    name: "DeletedUserDevices",
    definition(t) {
      t.list.nullable.int("deletedIds");
    },
  });