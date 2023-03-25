/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Address: { // root type
    addressLine1: string; // String!
    addressLine2?: string | null; // String
    city: string; // String!
    country: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    state: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    zip: string; // String!
  }
  AddressType: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Animal: { // root type
    adopted: boolean; // Boolean!
    adoptedDate?: NexusGenScalars['DateTime'] | null; // DateTime
    adoptionFee?: number | null; // Int
    age?: number | null; // Int
    birthDate?: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description?: string | null; // String
    height?: number | null; // Int
    id: number; // Int!
    name: string; // String!
    published: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    weight?: number | null; // Int
  }
  Author: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email?: string | null; // String
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username?: string | null; // String
  }
  Breed: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Color: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  DeletedUserDevices: { // root type
    deletedIds?: Array<number | null> | null; // [Int]
  }
  Location: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    published: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  LoginUser: { // root type
    authToken: string; // String!
    id: number; // Int!
  }
  LogoutUser: { // root type
    id: number; // Int!
  }
  Mutation: {};
  Post: { // root type
    content?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: {};
  Species: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // root type
    age?: number | null; // Int
    bio?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
  UserDevice: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    ipAddress?: string | null; // String
    name?: string | null; // String
    privateKey?: string | null; // String
    publicKey?: string | null; // String
    refreshToken?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userAgent?: string | null; // String
    userId?: number | null; // Int
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Address: { // field return type
    AddressType: NexusGenRootTypes['AddressType'] | null; // AddressType
    addressLine1: string; // String!
    addressLine2: string | null; // String
    city: string; // String!
    country: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    state: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    zip: string; // String!
  }
  AddressType: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Animal: { // field return type
    Location: NexusGenRootTypes['Location'] | null; // Location
    Species: NexusGenRootTypes['Species'] | null; // Species
    adopted: boolean; // Boolean!
    adoptedDate: NexusGenScalars['DateTime'] | null; // DateTime
    adoptionFee: number | null; // Int
    age: number | null; // Int
    animalColors: Array<NexusGenRootTypes['Color'] | null> | null; // [Color]
    birthDate: NexusGenScalars['DateTime'] | null; // DateTime
    breeds: Array<NexusGenRootTypes['Breed'] | null> | null; // [Breed]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string | null; // String
    height: number | null; // Int
    id: number; // Int!
    name: string; // String!
    published: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    weight: number | null; // Int
  }
  Author: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string | null; // String
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string | null; // String
  }
  Breed: { // field return type
    Species: NexusGenRootTypes['Species'] | null; // Species
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Color: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  DeletedUserDevices: { // field return type
    deletedIds: Array<number | null> | null; // [Int]
  }
  Location: { // field return type
    Addresses: Array<NexusGenRootTypes['Address'] | null> | null; // [Address]
    Animals: Array<NexusGenRootTypes['Animal'] | null> | null; // [Animal]
    Posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    Users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    published: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  LoginUser: { // field return type
    authToken: string; // String!
    id: number; // Int!
  }
  LogoutUser: { // field return type
    id: number; // Int!
  }
  Mutation: { // field return type
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteUserDevices: NexusGenRootTypes['DeletedUserDevices'] | null; // DeletedUserDevices
    loginUser: NexusGenRootTypes['LoginUser'] | null; // LoginUser
    logoutUser: NexusGenRootTypes['LogoutUser'] | null; // LogoutUser
  }
  Post: { // field return type
    author: NexusGenRootTypes['Author'] | null; // Author
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: { // field return type
    UserDevices: Array<NexusGenRootTypes['UserDevice'] | null> | null; // [UserDevice]
    Users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Species: { // field return type
    Animals: Array<NexusGenRootTypes['Animal'] | null> | null; // [Animal]
    Breeds: Array<NexusGenRootTypes['Breed'] | null> | null; // [Breed]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    name: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // field return type
    Addresses: Array<NexusGenRootTypes['Address'] | null> | null; // [Address]
    Locations: Array<NexusGenRootTypes['Location'] | null> | null; // [Location]
    Posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    age: number | null; // Int
    bio: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
  UserDevice: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    ipAddress: string | null; // String
    name: string | null; // String
    privateKey: string | null; // String
    publicKey: string | null; // String
    refreshToken: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userAgent: string | null; // String
    userId: number | null; // Int
  }
}

export interface NexusGenFieldTypeNames {
  Address: { // field return type name
    AddressType: 'AddressType'
    addressLine1: 'String'
    addressLine2: 'String'
    city: 'String'
    country: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    state: 'String'
    updatedAt: 'DateTime'
    zip: 'String'
  }
  AddressType: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    updatedAt: 'DateTime'
  }
  Animal: { // field return type name
    Location: 'Location'
    Species: 'Species'
    adopted: 'Boolean'
    adoptedDate: 'DateTime'
    adoptionFee: 'Int'
    age: 'Int'
    animalColors: 'Color'
    birthDate: 'DateTime'
    breeds: 'Breed'
    createdAt: 'DateTime'
    description: 'String'
    height: 'Int'
    id: 'Int'
    name: 'String'
    published: 'Boolean'
    updatedAt: 'DateTime'
    weight: 'Int'
  }
  Author: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    id: 'Int'
    updatedAt: 'DateTime'
    username: 'String'
  }
  Breed: { // field return type name
    Species: 'Species'
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    updatedAt: 'DateTime'
  }
  Color: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    updatedAt: 'DateTime'
  }
  DeletedUserDevices: { // field return type name
    deletedIds: 'Int'
  }
  Location: { // field return type name
    Addresses: 'Address'
    Animals: 'Animal'
    Posts: 'Post'
    Users: 'User'
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    published: 'Boolean'
    updatedAt: 'DateTime'
  }
  LoginUser: { // field return type name
    authToken: 'String'
    id: 'Int'
  }
  LogoutUser: { // field return type name
    id: 'Int'
  }
  Mutation: { // field return type name
    createUser: 'User'
    deleteUserDevices: 'DeletedUserDevices'
    loginUser: 'LoginUser'
    logoutUser: 'LogoutUser'
  }
  Post: { // field return type name
    author: 'Author'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    published: 'Boolean'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    UserDevices: 'UserDevice'
    Users: 'User'
  }
  Species: { // field return type name
    Animals: 'Animal'
    Breeds: 'Breed'
    createdAt: 'DateTime'
    id: 'Int'
    name: 'String'
    updatedAt: 'DateTime'
  }
  User: { // field return type name
    Addresses: 'Address'
    Locations: 'Location'
    Posts: 'Post'
    age: 'Int'
    bio: 'String'
    createdAt: 'DateTime'
    email: 'String'
    firstName: 'String'
    id: 'Int'
    lastName: 'String'
    updatedAt: 'DateTime'
    username: 'String'
  }
  UserDevice: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    ipAddress: 'String'
    name: 'String'
    privateKey: 'String'
    publicKey: 'String'
    refreshToken: 'String'
    updatedAt: 'DateTime'
    userAgent: 'String'
    userId: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      email: string; // String!
      firstName: string; // String!
      lastName: string; // String!
      password: string; // String!
      username: string; // String!
    }
    deleteUserDevices: { // args
      deviceId?: number | null; // Int
      deviceIds?: Array<number | null> | null; // [Int]
    }
    loginUser: { // args
      password: string; // String!
      username: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}