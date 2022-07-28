import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input UserFilterInput {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
  }

  input UserUpdateInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input UserLogin {
    email: String!
    password: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    login(input: UserLogin): String!
    updateUser(input: UserUpdateInput): User!
  }

  type Query {
    getUser(email: String!): User!
    getUsersByFiltering(filter: UserFilterInput): [User]
  }
`;
