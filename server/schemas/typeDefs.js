// requiring graphQL
const { gql } = require('apollo-server-express');


const typeDefs = gql`
  input CharacterInput {
    characterId: ID!
    name: String
    description: String
    image: String
  }

  type User {
    _id: ID
    username: String
    email: String
    adventures: [Adventure]
    savedCharacters: [Character]
  }
  
  type Adventure {
    _id: ID
    adventureTitle: String
    adventureBody: String
    adventureAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Character {
    characterId: ID!
    name: String
    description: String
    image: String
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
    getAdventures(username: String): [Adventure]
    adventure(adventureId: ID!): Adventure
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAdventure(adventureTitle: String!, adventureBody: String!): Adventure
    saveCharacter(characterInput: CharacterInput): User 
    addComment(adventureId: ID!, commentText: String!): Adventure
    updateAdventure(adventureTitle : String, adventureBody : String!, adventureId: ID!): Adventure 
    removeAdventure(adventureId: ID!): Adventure 
    removeComment(adventureId: ID!, commentId: ID!): Adventure
  }
`;

module.exports = typeDefs;
