import { objectType } from "nexus";

export const LoginUser = objectType({
    name: "LoginUser",
    definition(t) {
      t.nonNull.int("id");
      t.nonNull.string("authToken");
    },
  });