import { asNexusMethod, makeSchema, fieldAuthorizePlugin} from "nexus";
import { DateTimeResolver } from "graphql-scalars";

import { Mutation } from "././graphql/Resolvers/mutations";
import { Query } from "././graphql/Resolvers/queries";

import { Address } from "./graphql/Definitions/Address";
import { AddressType } from "./graphql/Definitions/AddressType";
import { Animal } from "./graphql/Definitions/Animal";
import { Author } from "./graphql/Definitions/Author";
import { Breed } from "./graphql/Definitions/Breed";
import { Color } from "./graphql/Definitions/Color";
import { DeletedUserDevices } from "./graphql/Definitions/DeletedUserDevices";
import { Location } from "./graphql/Definitions/Locations";
import { LoginUser } from "./graphql/Definitions/LoginUser";
import { LogoutUser } from "./graphql/Definitions/LogoutUser";
import { Post } from "./graphql/Definitions/Post";
import { Species } from "./graphql/Definitions/Species";
import { User } from "./graphql/Definitions/User";
import { UserDevice } from "./graphql/Definitions/UserDevice";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    // ----- //
    LoginUser,
    LogoutUser,
    User,
    UserDevice,
    DeletedUserDevices,
    Location,
    Post,
    Address,
    Animal,
    Species,
    Color,
    Breed,
    AddressType,
    Author,
    DateTime
  ],
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
