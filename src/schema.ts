import {
  makeSchema,
  objectType,
  asNexusMethod,
  nonNull,
  stringArg,
  fieldAuthorizePlugin
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "./context";
import bcrypt from "bcrypt";
import md5 from "md5";
import crypto from "crypto";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field('Users', {
      type: "User",
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany();
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("loginUser", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: { username: args.username }
        });
        if (!user) {
          throw new Error("No user with that username found.");
        }

        const incomingPassword = md5(user?.salt+args.password)

        if (user?.password !== incomingPassword) {
          throw new Error("Incorrect password.");
        }
        return user;
      }
    }),
    t.field("createUser", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        // check for unique email and username
        const email = await context.prisma.user.findUnique({
          where: { email: args.email },
        });
        const username = await context.prisma.user.findUnique({
          where: { username: args.username },
        });
        const usernameLowercase = await context.prisma.user.findUnique({
          where: { username: args.username.toLowerCase() },
        });
        if (email) {
          throw new Error("A user with that email is already registered.");
        }
        if (username || usernameLowercase) {
          throw new Error("A user with that username is already registered.");
        }
        const salt = bcrypt.genSaltSync(20);

        return context.prisma.user.create({
          data: {
            username: args.username,
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            password:  md5(salt+args.password),
            salt: salt,
          },
        });
      },
    });
  },
});

const User = objectType({
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

const Location = objectType({
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

const AddressType = objectType({
  name: "AddressType",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("name");
  }
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

const Color = objectType({
  name: "Color",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("name");
  },
});

const Species = objectType({
  name: "Species",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.string("name");
    t.list.field("Animals", {
      type: "Animal",
      resolve: (parent, _, context: Context) => {
        return context.prisma.species
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .Animals();
      },
    });
    t.list.field("Breeds", {
      type: "Breed",
      resolve: (parent, _, context: Context) => {
        return context.prisma.species
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .Breeds();
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
    t.field("Species", {
      type: "Species",
      resolve: (parent, _, context: Context) => {
        return context.prisma.breed
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .Species();
      },
    });
  },
});

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.string('title')
    t.string('content')
    t.nonNull.boolean('published')
    t.field('author', {
      type: 'Author',
      resolve: (parent, _, context: Context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    })
  },
})

const Author = objectType({
  name: 'Author',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('username')
    t.string('email')
  }
})

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    ////////////
    User,
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
