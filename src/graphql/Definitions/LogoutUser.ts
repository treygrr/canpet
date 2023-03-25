import { objectType } from "nexus";

export const LogoutUser = objectType({
  name: "LogoutUser",
  definition(t) {
    t.nonNull.int("id");
  },
});