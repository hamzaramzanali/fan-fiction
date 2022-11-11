// requiring graphQL
const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    adventures: [Adventure]
  }
  
  type Adventure {
    _id: ID
    adventureTitle: String
    adventureBody: String
    adventureAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    getAdventuresFromUser(username: String!): [Adventure]
    getAdventures: [Adventure]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAdventure(adventureTitle: String!, adventureBody: String!): Adventure 
    addComment(adventureId: ID!, commentText: String!): Adventure
    updateAdventure(adventureTitle : String, adventureBody : String!, adventureId: ID!): Adventure 
    removeAdventure(adventureId: ID!): Adventure 
    removeComment(adventureId: ID!, commentId: ID!): Adventure
  }
`;

module.exports = typeDefs;
