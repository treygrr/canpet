import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "./context";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allUsers", {
      type: "User",
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    });
  },
});

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("userName");
    t.nonNull.string("email");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.nonNull.string("age");
    t.nonNull.string("bio");
    t.field("address", {
      type: "Address",
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .address();
      },
    });
    t.field("posts", {
      type: "Post",
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts();
      },
    });
    t.field("location", {
      type: "Location",
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .location();
      },
    });
  },
});

const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id')
    t.string('email')
  },
})

const Location = objectType({
  name: "Location",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("name");
    t.nonNull.boolean("published");
    t.field("author", {
      type: "User",
      resolve: (parent, _, context: Context) => {
        return context.prisma.location
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .user();
      },
    });
    t.field("posts", {
      type: "Post",
      resolve: (parent, _, context: Context) => {
        return context.prisma.location
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .post();
      },
    });
    t.field("animals", {
      type: "Animal",
      resolve: (parent, _, context: Context) => {
        return context.prisma.location
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .animal();
      },
    });
    t.field("users", {
      type: "User",
      resolve: (parent, _, context: Context) => {
        return context.prisma.location
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .user();
      },
    });
    t.field("addresses", {
      type: "Address",
      resolve: (parent, _, context: Context) => {
        return context.prisma.location
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .address();
      },
    });
  },
});

const Address = objectType({
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
    t.field("location", {
      type: "Location",
      resolve: (parent, _, context: Context) => {
        return context.prisma.address
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .location();
      },
    });
    t.field("addressType", {
      type: "AddressType",
      resolve: (parent, _, context: Context) => {
        return context.prisma.address
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .addressType();
      },
    });
    t.field("user", {
      type: "User",
      resolve: (parent, _, context: Context) => {
        return context.prisma.address
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .user();
      },
    });
  },
});

const Animal = objectType({
  name: "Animal",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("name");
    t.nonNull.boolean("adopted");
    t.nonNull.boolean("published");
    t.field("location", {
      type: "Location",
      resolve: (parent, _, context: Context) => {
        return context.prisma.animal
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .location();
      },
    });
    t.field("species", {
      type: "Species",
      resolve: (parent, _, context: Context) => {
        return context.prisma.animal
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .species();
      },
    });
    t.field("birthDate", { type: "DateTime" });
    t.field("adoptedDate", { type: "DateTime" });
    t.field("adoptionFee", { type: "Int" });
    t.field("age", { type: "Int" });
    t.field("weight", { type: "Int" });
    t.field("height", { type: "Int" });
    t.field("description", { type: "String" });
    t.field("animalBreed", {
      type: "AnimalBreed",
      resolve: (parent, _, context: Context) => {
        return context.prisma.animal
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .animalBreed();
      },
    });
    t.field("animalColors", {
      type: "AnimalColor",
      resolve: (parent, _, context: Context) => {
        return context.prisma.animal
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .animalColors();
      },
    });
  },
});

const AnimalBreed = objectType({
  name: "AnimalBreed",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.field("animal", {
      type: "Animal",
      resolve: (parent, _, context: Context) => {
        return context.prisma.animalBreed
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .animal();
      },
    });
    t.field("breed", {
      type: "Breed",
      resolve: (parent, _, context: Context) => {
        return context.prisma.animalBreed
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .breed();
      },
    });
  },
});

const Species = objectType({
  name: "Species",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("name");
    t.field("animal", {
      type: "Animal",
      resolve: (parent, _, context: Context) => {
        return context.prisma.species
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .animal();
      },
    });
    t.field("breed", {
      type: "Breed",
      resolve: (parent, _, context: Context) => {
        return context.prisma.species
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .breed();
      },
    });
  },
});

const Breed = objectType({
  name: "Breed",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("name");
    t.field("species", {
      type: "Species",
      resolve: (parent, _, context: Context) => {
        return context.prisma.breed
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .species();
      },
    });
    t.field("AnimalBreed", {
      type: "AnimalBreed",
      resolve: (parent, _, context: Context) => {
        return context.prisma.breed
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .AnimalBreed();
      },
    });
  },
});



const AnimalColor = objectType({
  name: "AnimalColor",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.field("animal", {
      type: "Animal",
      resolve: (parent, _, context: Context) => {
        return context.prisma.animalColor
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .animal();
      },
    });
    t.field("color", {
      type: "Color",
      resolve: (parent, _, context: Context) => {
        return context.prisma.animalColor
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .color();
      },
    });
  },
});



const Post = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("title");
    t.string("content");
    t.nonNull.boolean("published");
    t.field("author", {
      type: "User",
      resolve: (parent, _, context: Context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });
    t.field("location", {
      type: "Location",
      resolve: (parent, _, context: Context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .location();
      },
    });
  },
});

export const schema = makeSchema({
  types: [
    Query,
    User
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
