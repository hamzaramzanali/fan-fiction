// requiring graphQL
const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }
  
  type Adventure {
    _id: ID
    adventureTitle: String
    adventureBody: String
    adventureAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAdventure(adventureTitle: String!, adventureBody: String!): Adventure 
  }
`;

module.exports = typeDefs;
